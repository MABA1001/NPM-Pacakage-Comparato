import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { calculateScore } from "../utils/scoreUtil";
import "./../styles/recommenderStyles.css"


export default function PackageRecommender({ packageOne, packageTwo }) {
  const scoreOne = calculateScore(packageOne);
  const scoreTwo = calculateScore(packageTwo);
  const betterPackage =
    scoreOne > scoreTwo
      ? packageOne.collected.metadata.name
      : packageTwo.collected.metadata.name;
  const timesBetter =
    scoreOne > scoreTwo
      ? parseFloat((scoreOne / scoreTwo).toFixed(4))
      : parseFloat((scoreTwo / scoreOne).toFixed(4));
  const packageData = scoreOne > scoreTwo ? packageOne : packageTwo;

  return (
    <>
      {Object.keys(packageOne).length > 0 && (
        <Stack sx={{ marginTop: 8 }}>
          <Paper
            elevation={5}
            id="title"
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
            id= "content"
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
                    id="downloadCard"
                  >
                    <Typography variant="h6">Downloads</Typography>
                    <Typography variant="h6">
                      {`${Math.round(packageData.evaluation.popularity.downloadsCount)}+`}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    id="starCard"
                  >
                    <Typography variant="h6">Stars</Typography>
                    <Typography variant="h6">
                      {`${Math.round(packageData.collected.npm.starsCount)}+`}
                    </Typography>
                  </Paper>
                  <Paper
                    elevation={3}
                    id="healthCard"
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
                <Box
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Box
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />

                  <Box>
                    <Typography style={{ width: "100px", textAlign: "center" }}>
                      <Typography variant="h6">Languages</Typography>
                    </Typography>
                  </Box>

                  <Box
                    style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                  />
                </Box>


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
