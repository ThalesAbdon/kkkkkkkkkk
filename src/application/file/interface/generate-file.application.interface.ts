import { OrderStatus } from 'src/shared/order-status.enum';

export interface GenerateFileApplicationInput {
  orderDate?: {
    gt?: Date;  
    gte?: Date; 
    lt?: Date;  
    lte?: Date;
  };
  updatedAt?: {
    gt?: Date;
    gte?: Date;
    lt?: Date;
    lte?: Date;
  };
  status?: OrderStatus;
}
