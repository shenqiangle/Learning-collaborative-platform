/**
 * act
 */
export interface Act {
    actDesc: string;
    endDate: string;
    /**
     * ID 编号
     */
    id: string;
    actTitle: string;
    img: string;
    src: string;
    startDate: string;
    [property: string]: any;
  }