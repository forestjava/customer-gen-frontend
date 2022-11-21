const redundants = <T>(array1?: T[], array2?: T[]): T[] | undefined => {
  return array1?.filter((element: T) => !array2?.find((item: T) => element === item));
};

export default redundants;
