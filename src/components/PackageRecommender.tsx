import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Padding } from "@mui/icons-material";

export default function PackageRecommender({ packageOne, packageTwo }) {
  const [packageOneScore, setPackageOneScore] = useState(0);
  const [packageTwoScore, setPackageTwoScore] = useState(0);
  const [betterPackage, setBetterPackage] = useState("");
  const [timesBetter, setTimesBetter] = useState(0);
  const [packageData, setPackageData] = useState({});

  useEffect(() => {
    const scoreOne = calculateScore(packageOne);
    const scoreTwo = calculateScore(packageTwo);

    setPackageOneScore(scoreOne);
    setPackageTwoScore(scoreTwo);

    if (scoreOne > scoreTwo) {
      setBetterPackage(packageOne.collected.metadata.name);
      setTimesBetter(parseFloat((scoreOne / scoreTwo).toFixed(4)));
      setPackageData(packageOne);
    } else if (scoreTwo > scoreOne) {
      setBetterPackage(packageTwo.collected.metadata.name);
      setTimesBetter(parseFloat((scoreTwo / scoreOne).toFixed(4)));
      setPackageData(packageTwo);
    } else {
      setBetterPackage("");
    }
  }, [packageData]);

  function calculateScore(packageData) {
    return (
      packageData.evaluation.popularity.communityInterest * 0.2 +
      packageData.evaluation.popularity.downloadsCount * 0.5 +
      0.3 *
        (packageData.evaluation.quality.carefulness +
          packageData.evaluation.quality.tests)
    );
  }

  return (
    <>
      {Object.keys(packageData).length > 0 && (
        <Stack sx={{ marginTop: 8 }}>
          <Paper
            elevation={5}
            sx={{
              padding: 3,
              width: "65%",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: "#000066",
              color: "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
              }}
            >
              {`${betterPackage} is ${timesBetter} time(s) better`}
            </Typography>
          </Paper>
          <Paper
            elevation={5}
            square={true}
            sx={{
              padding: 3,
              width: "65%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: 1,
              marginBottom: 3,
            }}
          >
            <Stack>
              <Stack direction={"row"}>
                <Stack sx={{ width: "50%" }}>
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: 1, fontWeight: "bold", color: "#333" }}
                  >
                    {`Recommended: ${betterPackage}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{ marginBottom: 1, color: "#666" }}
                  >
                    {`${packageData.collected.metadata.description}`}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "#007bff" }}>
                    {`For more information, visit `}
                    <a
                      href={packageData.collected.metadata.links.npm}
                      style={{ color: "#007bff", textDecoration: "underline" }}
                    >
                      HomePage
                    </a>
                  </Typography>
                </Stack>
                <Stack direction={"row"} sx={{ width: "50%" }}>
                  <Paper
                    elevation={3}
                    sx={{
                      width: "30%",
                      textAlign: "center",
                      padding: 2,
                      backgroundColor: "#7DBB00",
                    }}
                  >
                    <Typography variant="h6">Downloads</Typography>
                    <Typography variant="h6">
                      {`${Math.round(packageData.evaluation.popularity.downloadsCount)}+`}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    sx={{
                      width: "30%",
                      marginLeft: 1,
                      textAlign: "center",
                      backgroundColor: "#FFCC00",
                      padding: 2,
                    }}
                  >
                    <Typography variant="h6">Stars</Typography>
                    <Typography variant="h6">
                      {`${Math.round(packageData.collected.npm.starsCount)}+`}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    sx={{
                      width: "30%",
                      marginLeft: 1,
                      textAlign: "center",
                      padding: 2,
                      backgroundColor: "#FF474c",
                    }}
                  >
                    <Typography variant="h6">Health</Typography>
                    <Typography variant="h6">
                      {" "}
                      {`${Math.round(packageData.evaluation.quality.tests)}%`}{" "}
                    </Typography>
                  </Paper>
                </Stack>
              </Stack>
              <Stack>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />

                  <div>
                    <p style={{ width: "100px", textAlign: "center" }}>
                      <Typography variant="h6">Languages</Typography>
                    </p>
                  </div>

                  <div
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </div>
                <Stack direction={"row"}>
                  <Paper elevation={5} sx={{ padding: 1 }}>
                    <Typography variant="subtitle1">Javascript</Typography>
                  </Paper>
                  <Paper elevation={5} sx={{ marginLeft: 2, padding: 1 }}>
                    <Typography variant="subtitle1">Typescript</Typography>
                  </Paper>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      )}
    </>
  );
}
