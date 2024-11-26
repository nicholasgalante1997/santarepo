export {};

type ServiceData = {
  port: number;
  name: string;
  type: string;
  runtime: string;
};

const Services: {
  [serviceName: string]: ServiceData;
};

export { Services };
