import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from 'react';
import PackageRecommender from './PackageRecommender';
import dayjs from 'dayjs';
import numeral from 'numeral'; // Import numeral library
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';

type DateArray = Date[];
type NumberArray = number[];

interface PackageData {
  collected: {
    npm: {
      downloads: {
        from: string;
        count: number;
      }[];
    };
  };
}

export default function DownloadsGraph({ packageOne, packageTwo }: { packageOne: PackageData; packageTwo: PackageData; }) {
  const [xDataPoints1, setXDataPoints1] = useState<DateArray>([]);
  const [yDataPoints1, setYDataPoints1] = useState<NumberArray>([]);
  const [xDataPoints2, setXDataPoints2] = useState<DateArray>([]);
  const [yDataPoints2, setYDataPoints2] = useState<NumberArray>([]);

  useEffect(() => {
    function dateConversion(packageData: PackageData, setXDataPoints: (points: DateArray) => void, setYDataPoints: (points: NumberArray) => void) {
      const newDataPoints = packageData.collected.npm.downloads.map(object => new Date(object.from));
      setXDataPoints(prevDataPoints => [...prevDataPoints, ...newDataPoints]);
      const extractedDownloads = packageData.collected.npm.downloads.map(object => object.count);
      setYDataPoints(prevDataPoints => [...prevDataPoints, ...extractedDownloads]);
    }

    dateConversion(packageOne, setXDataPoints1, setYDataPoints1);
    dateConversion(packageTwo, setXDataPoints2, setYDataPoints2);
  }, [packageOne, packageTwo]);

  const formatYAxis = (value: number) => numeral(value).format('0.0a'); 

  return (
    <>
      {(xDataPoints1.length > 0 && yDataPoints1.length > 0) && (xDataPoints2.length > 0 && yDataPoints2.length > 0) && (
        <Stack sx={{ marginTop: 12 }}>
          <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <Typography variant='h3' sx={{marginBottom:2}}> Downloads</Typography>
            <LineChart
              xAxis={[
                { data: xDataPoints1, tickInterval: xDataPoints1, scaleType: 'point', valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY') },
                { data: xDataPoints2, tickInterval: xDataPoints2, scaleType: 'point', valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY') }
              ]}
              yAxis={[
                { valueFormatter: formatYAxis }
              ]}
              series={[
                { label: `${packageOne.collected.metadata.name}`, data: yDataPoints1 },
                { label: `${packageTwo.collected.metadata.name}`, data: yDataPoints2, color:"orange"}
              ]}
              width={900}
              height={600}
            />
          </div>
        </Stack>
      )}
      <PackageRecommender packageOne={packageOne} packageTwo={packageTwo} />
    </>
  );
}
