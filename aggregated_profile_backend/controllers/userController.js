const jwt = require("jsonwebtoken");
const {
  fetchUserFromJsonPlaceholder,
  fetchUserFromGitHub,
} = require("../utils/fetchHelpers");

const JWT_SECRET =
  process.env.JWT_SECRET || "gowtham";

exports.loginUser = (req, res) => {
  const { username, password } = req.body;
  console.log("user-->", req.body);
  if (username && password) {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      message: "Authentication successful",
      expiresIn: "1 hour",
    });
  } else {
    res.status(400).json({ error: "Username and password required" });
  }
};

exports.getAggregatedProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const [placeholderUser, githubUser] = await Promise.all([
      fetchUserFromJsonPlaceholder(username),
      fetchUserFromGitHub(username),
    ]);

    if (!placeholderUser && !githubUser) {
      return res
        .status(404)
        .json({ error: "User not found ", username });
    }

    const aggregatedProfile = {
      username,
      name: placeholderUser?.name || githubUser?.name || "N/A",
      email: placeholderUser?.email || "N/A",
      role: "developer",
      city: placeholderUser?.address?.city || "N/A",
      companyName:
        placeholderUser?.company?.name || githubUser?.company || "N/A",
      github: githubUser
        ? {
            avatarUrl: githubUser.avatar_url,
            profile: githubUser.html_url,
            bio: githubUser.bio || "No bio available",
            publicRepos: githubUser.public_repos,
          }
        : {
            avatarUrl: "N/A",
            profile: "N/A",
            bio: "N/A",
            publicRepos: 0,
          },
    };

    res.json(aggregatedProfile);
  } catch (error) {
    console.error("Error aggregating profile:", error.message);
    res.status(500).json({
      error: "Internal server... ",
      details: error.message,
    });
  }
};
