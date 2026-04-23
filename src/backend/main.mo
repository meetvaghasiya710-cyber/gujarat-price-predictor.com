import Types "types/price-prediction";
import PricePredictionApi "mixins/price-prediction-api";
import List "mo:core/List";

actor {
  let predictionHistory = List.empty<Types.PredictionRecord>();
  include PricePredictionApi(predictionHistory);
};
