import { DateArray, NumberArray, PackageData } from '../global/types';

export function dateConversion(
  packageData: PackageData,
  setXDataPoints: (
    points: DateArray,
  ) => [DateArray, React.Dispatch<React.SetStateAction<DateArray>>],
  setYDataPoints: (
    points: NumberArray,
  ) => [DateArray, React.Dispatch<React.SetStateAction<NumberArray>>],
) {
  const newDataPoints = packageData.collected.npm.downloads.map(object => new Date(object.from));
  setXDataPoints(prevDataPoints => [...prevDataPoints, ...newDataPoints]);
  const extractedDownloads = packageData.collected.npm.downloads.map(object => object.count);
  setYDataPoints(prevDataPoints => [...prevDataPoints, ...extractedDownloads]);
}
