import type ComplexType from '../types/Complex.type';

import axios from './axios';

// TODO: owner should not be api response
const filterResponse = (data: ComplexType) => {
  const { owner, ...filteredData } = data;
  return filteredData;
};

export async function GetComplexQuery() {
  try {
    const { data } = await axios.get<ComplexType>('/sports-complex/owner');

    return filterResponse(data);
  } catch (err) {
    console.log(err);
  }
}

interface ComplexDataType extends Omit<ComplexType, 'id'> {
  id?: string;
}

export async function CreateComplexQuery(body: ComplexDataType) {
  try {
    const { data } = await axios.post<ComplexType>('/sports-complex', body);

    return filterResponse(data);
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateComplexQuery(body: ComplexType, id: string) {
  try {
    const { data } = await axios.patch(`/sports-complex/${id}`, filterResponse(body));

    return filterResponse(data);
  } catch (err) {
    console.log(err);
  }
}
