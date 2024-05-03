import axios from 'axios';
import { TPackage } from '../global/types';

export const getPackagesApiCall = async (queryOptions: string) => {
  try {
    const response = await axios.get(`https://api.npms.io/v2/search?q=${queryOptions}`);
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getOnePackageApiCall = async (packageName: string) => {
  try {
    const response = await axios.get<TPackage>(`https://api.npms.io/v2/package/${packageName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchData = async (queryOptions: string, setState) => {
  const response = await getOnePackageApiCall(queryOptions);
  setState(response);
};
