import { type objectProp } from './validationInputs';

type validationType = (obj: objectProp) => any;

export const modifyObj: validationType = (obj) => {
  const objKey = Object.keys(obj);
  const objToArr = Object.entries(obj);
  const arrayOfObj = objToArr.map((item, index) => {
    const key = objKey[index];
    const value: string = item[1].value;
    return { [key]: value };
  });
  const newObj = arrayOfObj.reduce((acc, cur) => {
    return { ...acc, ...cur };
  }, {});
  return newObj;
};
