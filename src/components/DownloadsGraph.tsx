import { LineChart } from '@mui/x-charts/LineChart';
import { useState, useEffect } from 'react';
import PackageRecommender from './PackageRecommender';
import dayjs from 'dayjs';
import { Paper } from '@mui/material';
import { Height } from '@mui/icons-material';

export default function DownloadsGraph({ packageOne, packageTwo }) {
  const [xDataPoints, setXDataPoints] = useState([]);
  const [yDataPoints, setYDataPoints] = useState([]);
  let[xDataSeries,setXDataSeries]=useState([[]]);
  let[yDataSeries,setYDataSeries]=useState([[]]);
  useEffect(() => {
    function dateConversion(packageData) {
      const newDataPoints = packageData.collected.npm.downloads.map(object => new Date(object.from));
      setXDataPoints(prevDataPoints => [...prevDataPoints, ...newDataPoints]);
      const extractedDownloads= packageOne.collected.npm.downloads.map(object => object.count);
      setYDataPoints(prevDataPoints => [...prevDataPoints, ...extractedDownloads]);
      console.log(extractedDownloads)
      console.log(newDataPoints)
      console.log( packageOne)
      setXDataSeries=(prevDataPoints => [...prevDataPoints, ...newDataPoints]);
      setYDataSeries=(prevDataPoints => [...prevDataPoints, ...extractedDownloads]);
      console.log(newDataPoints)
    }

    dateConversion(packageOne);
  }, [packageOne]);

  return (
    <>
      {xDataPoints.length > 0 && yDataPoints &&(
        <div style={{marginLeft:"auto",display:"flex"}}>
          <LineChart
            xAxis={[{ data: xDataPoints,tickInterval: xDataPoints,scaleType: 'point', valueFormatter: (date) => dayjs(date).format('DD/MM/YYYY')}]}
            series={[
              {
                data: yDataPoints,
              },
            ]}
            width={900}
            height={600}
          />
          </div>
      )}
      <PackageRecommender packageOne={packageOne} packageTwo={packageTwo}/>
    </>
  );
}
