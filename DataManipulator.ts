import { ServerRespond } from './DataStreamer';

export interface Row {
  price_abc: number,
  price_def: number,
  ratio: number,
  upper_bound: number,
  lower_bound: number,
  trigger_alert: number | undefined,
  timestamp: Date,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]): Row {
    const priceABC = (serverRespond[0].top_ask.price + serverRespod[0].top_bid.price) / 2;
    const priceDEF = (serverRespond[1].top_ask.price + serverRespond[1].top_bid.price) / 2;
    const ratio= priceABC/ priceDEF;
    const upperBounnd = l + 0.05;
    const lowerBound = l - 0.05;
    return {
        price_abc: priceABC,
        price_def: priceDEF,
        ratio,
        timestamp: serverRespond[0].timestamp > serverRespond[1].timestamp ?
        serverRespond[0].timestamp: serverRespond[1].timestamp,
        upper_bound: upperBounnd,
        lower_bound: lowerBound,
        trigger_alert: (ratio > upperBounnd || ratio < lowerBound) ? ratio : undefined,
    };
}
}
    