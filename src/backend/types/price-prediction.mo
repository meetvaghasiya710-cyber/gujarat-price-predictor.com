module {
  public type PredictionInput = {
    area : Float;
    bhk : Nat;
    bathrooms : Nat;
    houseAge : Nat;
    floor : Nat;
    totalFloors : Nat;
    city : Text;
    location : Text;
    propertyType : Text;
    furnishing : Text;
    parking : Bool;
  };

  public type PriceBreakdown = {
    basePrice : Float;
    locationMultiplier : Float;
    amenityBonus : Float;
    ageDiscount : Float;
    floorBonus : Float;
  };

  public type PredictionResult = {
    estimatedPrice : Float;
    pricePerSqft : Float;
    confidence : Text;
    breakdown : PriceBreakdown;
  };

  public type PredictionRecord = {
    input : PredictionInput;
    result : PredictionResult;
    timestamp : Int;
  };
};
