import Types "../types/price-prediction";
import PricePredictionLib "../lib/price-prediction";
import List "mo:core/List";
import Time "mo:core/Time";

mixin (history : List.List<Types.PredictionRecord>) {
  // Update call — appends to history
  public func predictPrice(input : Types.PredictionInput) : async Types.PredictionResult {
    let result = PricePredictionLib.predict(input);
    let record : Types.PredictionRecord = {
      input;
      result;
      timestamp = Time.now();
    };
    history.add(record);
    result;
  };

  public query func getRecentPredictions() : async [Types.PredictionRecord] {
    PricePredictionLib.recentSlice(history, 10);
  };

  public query func getPredictionStats() : async Nat {
    history.size();
  };
};
