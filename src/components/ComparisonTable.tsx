import { useState, useEffect } from "react";
import DownloadsGraph from "./DownloadsGraph";
import { TPackage } from "../global/types";
import { TRows } from "../global/types";
import { fetchData } from "../utils/apiUtils";
import { rowFormatter } from "../utils/rowFormatter";
import TableComponent from "./TableComponent";

export default function ComparisonTable({ selectedPackages }) {
  const [firstPackageData, setfirstPackageData] = useState<
    TPackage | undefined
  >();
  const [secondPackageData, setSecondPackageData] = useState<
    TPackage | undefined
  >();
  const [rows, setRows] = useState<Array<TRows>>([]);

  useEffect(() => {
    const promiseOne = fetchData(
      selectedPackages[0].package.name,
      setfirstPackageData,
    );
    const promiseTwo = fetchData(
      selectedPackages[1].package.name,
      setSecondPackageData,
    );
    Promise.all([promiseOne, promiseTwo]);
  }, [selectedPackages]);

  useEffect(() => {
    if (firstPackageData && secondPackageData) {
      setRows(rowFormatter(firstPackageData, secondPackageData));
    }
  }, [firstPackageData, secondPackageData]);

  return (
    <>
      {firstPackageData && secondPackageData && (
        <>
          <TableComponent
            rows={rows}
            firstPackageName={firstPackageData?.collected.metadata.name}
            secondPackageName={secondPackageData?.collected.metadata.name}
          />

          <DownloadsGraph
            packageOne={firstPackageData}
            packageTwo={secondPackageData}
          />
        </>
      )}
    </>
  );
}
