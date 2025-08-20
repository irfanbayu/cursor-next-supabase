import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabaseClient";

// Interface untuk GitHub API response
interface GitHubContentResponse {
  content: string;
  encoding: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: string;
  url: string;
  git_url: string;
  html_url: string;
  download_url: string;
  _links: {
    git: string;
    html: string;
    self: string;
  };
}

export interface ApiKeyValidationResult {
  isValid: boolean;
  message: string;
  apiKey?: {
    id: number;
    name: string;
    usage: number;
  };
}

const validateApiKey = async (
  apiKey: string
): Promise<ApiKeyValidationResult> => {
  try {
    // Query the api_keys table to check if the key exists
    const { data, error } = await supabase
      .from("api_keys")
      .select("id, name, value, usage")
      .eq("value", apiKey)
      .single();

    if (error) {
      console.error("Error validating API key:", error);
      return {
        isValid: false,
        message: "Error validating API key",
      };
    }

    if (!data) {
      return {
        isValid: false,
        message: "Invalid API Key",
      };
    }

    // Update usage count
    await supabase
      .from("api_keys")
      .update({ usage: data.usage + 1 })
      .eq("id", data.id);

    return {
      isValid: true,
      message: "Valid API key, GitHub summarizer can be accessed",
      apiKey: {
        id: data.id,
        name: data.name,
        usage: data.usage + 1,
      },
    };
  } catch (error) {
    console.error("Error in validateApiKey:", error);
    return {
      isValid: false,
      message: "Error validating API key",
    };
  }
};

// Function to extract owner and repo from GitHub URL
const extractGitHubInfo = (
  githubUrl: string
): { owner: string; repo: string } | null => {
  try {
    const url = new URL(githubUrl);
    if (url.hostname !== "github.com") {
      return null;
    }

    const pathParts = url.pathname.split("/").filter(Boolean);
    if (pathParts.length < 2) {
      return null;
    }

    return {
      owner: pathParts[0],
      repo: pathParts[1],
    };
  } catch (error) {
    return null;
  }
};

// Function to get README.md content from GitHub
const getReadmeContent = async (
  githubUrl: string
): Promise<{ success: boolean; content?: string; error?: string }> => {
  try {
    const githubInfo = extractGitHubInfo(githubUrl);
    if (!githubInfo) {
      return {
        success: false,
        error:
          "Invalid GitHub URL format. Expected: https://github.com/owner/repo",
      };
    }

    const { owner, repo } = githubInfo;

    // Try different README file names
    const readmeFiles = ["README.md", "readme.md", "Readme.md", "README.MD"];

    for (const filename of readmeFiles) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`,
          {
            headers: {
              Accept: "application/vnd.github.v3+json",
              "User-Agent": "GitHub-Summarizer-App",
            },
          }
        );

        if (response.ok) {
          const data: GitHubContentResponse = await response.json();

          if (data.content && data.encoding === "base64") {
            // Decode base64 content
            const content = Buffer.from(data.content, "base64").toString(
              "utf-8"
            );
            return {
              success: true,
              content,
            };
          }
        }
      } catch (error) {
        console.error(`Error fetching ${filename}:`, error);
        continue;
      }
    }

    return {
      success: false,
      error: "README.md file not found in the repository",
    };
  } catch (error) {
    console.error("Error in getReadmeContent:", error);
    return {
      success: false,
      error: "Failed to fetch README content from GitHub",
    };
  }
};

export async function POST(request: NextRequest) {
  try {
    // Get API key from x-api-key header
    const apiKey = request.headers.get("x-api-key");

    // Get GitHub URL from request body
    const body = await request.json();
    const { githubUrl } = body;

    // Validate required fields
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key is required in x-api-key header" },
        { status: 400 }
      );
    }

    if (!githubUrl) {
      return NextResponse.json(
        { error: "GitHub URL is required in request body" },
        { status: 400 }
      );
    }

    // Validate API key
    const validationResult = await validateApiKey(apiKey);

    if (!validationResult.isValid) {
      return NextResponse.json(
        { error: validationResult.message },
        { status: 401 }
      );
    }

    // Get README.md content from GitHub
    const readmeResult = await getReadmeContent(githubUrl);

    if (!readmeResult.success) {
      return NextResponse.json({ error: readmeResult.error }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: "GitHub README content retrieved successfully",
      apiKey: validationResult.apiKey,
      githubUrl: githubUrl,
      readmeContent: readmeResult.content,
      contentLength: readmeResult.content?.length || 0,
    });
  } catch (error) {
    console.error("Error in github-summarizer endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "GitHub README Fetcher API",
    description:
      "POST to this endpoint with x-api-key header and githubUrl in body to fetch README.md content from GitHub repositories",
    usage: {
      method: "POST",
      headers: {
        "x-api-key": "string (required)",
      },
      body: {
        githubUrl: "string (required)",
      },
    },
    features: [
      "Validasi API key dari header x-api-key",
      "Parsing GitHub URL untuk ekstrak owner/repo",
      "Fetch README.md content dari GitHub API",
      "Support multiple README file formats",
      "Base64 decoding untuk konten file",
      "Error handling untuk berbagai skenario",
    ],
  });
}
