import Array "mo:core/Array";
import Types "../types/price-prediction";
import List "mo:core/List";

module {
  // City base prices per sqft (INR)
  public func cityBasePricePerSqft(city : Text) : Float {
    switch (city) {
      case "Ahmedabad"   { 5500.0 };
      case "Surat"       { 5000.0 };
      case "Vadodara"    { 4500.0 };
      case "Gandhinagar" { 4800.0 };
      case "Rajkot"      { 4000.0 };
      case "Bhavnagar"   { 3500.0 };
      case "Jamnagar"    { 3200.0 };
      case "Junagadh"    { 3000.0 };
      case "Anand"       { 3800.0 };
      case "Bharuch"     { 3200.0 };
      case "Mehsana"     { 3000.0 };
      case "Morbi"       { 2800.0 };
      case _             { 3200.0 };
    };
  };

  // Location multipliers per (city, area)
  public func locationMultiplier(city : Text, location : Text) : Float {
    switch (city, location) {
      // Ahmedabad
      case ("Ahmedabad", "Satellite")      { 1.45 };
      case ("Ahmedabad", "Prahlad Nagar")  { 1.45 };
      case ("Ahmedabad", "Bodakdev")       { 1.42 };
      case ("Ahmedabad", "SG Highway")     { 1.40 };
      case ("Ahmedabad", "Vastrapur")      { 1.38 };
      case ("Ahmedabad", "Navrangpura")    { 1.35 };
      case ("Ahmedabad", "Thaltej")        { 1.35 };
      case ("Ahmedabad", "CG Road")        { 1.35 };
      case ("Ahmedabad", "Ambawadi")       { 1.30 };
      case ("Ahmedabad", "Paldi")          { 1.20 };
      case ("Ahmedabad", "Naranpura")      { 1.20 };
      case ("Ahmedabad", "Ghatlodia")      { 1.15 };
      case ("Ahmedabad", "Chandlodia")     { 1.12 };
      case ("Ahmedabad", "Maninagar")      { 1.10 };
      case ("Ahmedabad", "Vastral")        { 1.00 };
      case ("Ahmedabad", "Nikol")          { 0.98 };
      case ("Ahmedabad", "Odhav")          { 0.96 };
      case ("Ahmedabad", "Naroda")         { 0.95 };
      // Surat
      case ("Surat", "Vesu")               { 1.40 };
      case ("Surat", "Adajan")             { 1.35 };
      case ("Surat", "Citylight")          { 1.28 };
      case ("Surat", "Athwa")              { 1.30 };
      case ("Surat", "Pal")                { 1.25 };
      case ("Surat", "Althan")             { 1.22 };
      case ("Surat", "Piplod")             { 1.20 };
      case ("Surat", "Bhatar")             { 1.15 };
      case ("Surat", "Katargam")           { 1.05 };
      case ("Surat", "Udhna")              { 0.98 };
      case ("Surat", "Sachin")             { 0.95 };
      // Vadodara
      case ("Vadodara", "Alkapuri")        { 1.45 };
      case ("Vadodara", "Fatehgunj")       { 1.35 };
      case ("Vadodara", "Sayajigunj")      { 1.30 };
      case ("Vadodara", "Subhanpura")      { 1.18 };
      case ("Vadodara", "Manjalpur")       { 1.20 };
      case ("Vadodara", "Karelibaug")      { 1.15 };
      case ("Vadodara", "Harni")           { 1.10 };
      case ("Vadodara", "Waghodia Road")   { 1.00 };
      case ("Vadodara", "Gorwa")           { 1.05 };
      // Gandhinagar
      case ("Gandhinagar", "Kudasan")      { 1.40 };
      case ("Gandhinagar", "Randesan")     { 1.35 };
      case ("Gandhinagar", "Sector 1")     { 1.35 };
      case ("Gandhinagar", "Sector 7")     { 1.30 };
      case ("Gandhinagar", "Sector 11")    { 1.25 };
      case ("Gandhinagar", "Sector 16")    { 1.20 };
      case ("Gandhinagar", "Sector 21")    { 1.15 };
      case ("Gandhinagar", "Sargasan")     { 1.10 };
      // Rajkot
      case ("Rajkot", "150 Feet Ring Road"){ 1.30 };
      case ("Rajkot", "Kalawad Road")      { 1.35 };
      case ("Rajkot", "Mavdi")             { 1.25 };
      case ("Rajkot", "Yagnik Road")       { 1.20 };
      case ("Rajkot", "Raiya Road")        { 1.15 };
      case ("Rajkot", "Kalavad")           { 1.10 };
      case ("Rajkot", "Bhaktinagar")       { 1.05 };
      case ("Rajkot", "Kothariya")         { 1.00 };
      // Bhavnagar
      case ("Bhavnagar", "Waghawadi Road") { 1.30 };
      case ("Bhavnagar", "Subhashnagar")   { 1.20 };
      case ("Bhavnagar", "Ghogha Circle")  { 1.10 };
      case ("Bhavnagar", "Nari Road")      { 1.05 };
      case ("Bhavnagar", "Sardarnagar")    { 1.00 };
      // Jamnagar
      case ("Jamnagar", "Park Colony")     { 1.25 };
      case ("Jamnagar", "Digvijay Plot")   { 1.20 };
      case ("Jamnagar", "Bedi Gate")       { 1.10 };
      case ("Jamnagar", "Indira Colony")   { 1.05 };
      // Anand
      case ("Anand", "Vallabh Vidyanagar") { 1.30 };
      case ("Anand", "Anand Town")         { 1.20 };
      case ("Anand", "Vidyanagar")         { 1.15 };
      case ("Anand", "Karamsad")           { 1.10 };
      // Junagadh
      case ("Junagadh", "Kalwa Chowk")     { 1.20 };
      case ("Junagadh", "Ranavav Road")    { 1.10 };
      case ("Junagadh", "Majewadi Gate")   { 1.05 };
      // Bharuch
      case ("Bharuch", "Ankleshwar")       { 1.25 };
      case ("Bharuch", "Zadeshwar")        { 1.15 };
      case ("Bharuch", "Bharuch City")     { 1.10 };
      // Mehsana
      case ("Mehsana", "Mehsana City")     { 1.15 };
      case ("Mehsana", "Unjha")            { 1.05 };
      case ("Mehsana", "Visnagar")         { 1.00 };
      // Morbi
      case ("Morbi", "Morbi City")         { 1.10 };
      case ("Morbi", "GIDC Morbi")         { 1.05 };
      // Default: no location premium/discount
      case _                               { 1.00 };
    };
  };

  // Property type multipliers
  public func propertyTypeMultiplier(propertyType : Text) : Float {
    switch (propertyType) {
      case "Flat"      { 1.00 };
      case "Apartment" { 1.05 };
      case "Bungalow"  { 1.35 };
      case "Villa"     { 1.45 };
      case _           { 1.00 };
    };
  };

  // Furnishing multipliers
  public func furnishingMultiplier(furnishing : Text) : Float {
    switch (furnishing) {
      case "Unfurnished"    { 1.00 };
      case "Semi-Furnished" { 1.08 };
      case "Furnished"      { 1.18 };
      case _                { 1.00 };
    };
  };

  // Parking bonus: +3% of base price per sqft
  public func parkingBonus(parking : Bool, basePricePerSqft : Float) : Float {
    if (parking) { basePricePerSqft * 0.03 } else { 0.0 };
  };

  // Age discount: 2% per year, max 20%
  public func ageDiscount(houseAge : Nat) : Float {
    let discount = houseAge.toFloat() * 0.02;
    if (discount > 0.20) { 0.20 } else { discount };
  };

  // Floor bonus: +1% per floor (capped at floor 10), ground floor (0) gets 0%
  public func floorBonus(floor : Nat) : Float {
    let cappedFloor : Nat = if (floor > 10) { 10 } else { floor };
    cappedFloor.toFloat() * 0.01;
  };

  // Confidence level
  public func confidenceLevel(input : Types.PredictionInput) : Text {
    let tierOneCities = ["Ahmedabad", "Surat", "Vadodara"];
    let isTopCity = switch (tierOneCities.find(func(c) { c == input.city })) {
      case (?_) { true };
      case null  { false };
    };
    if (input.area > 500.0 and isTopCity) {
      "High"
    } else if (input.area >= 200.0 and input.area <= 500.0) {
      "Medium"
    } else if (not isTopCity) {
      "Medium"
    } else {
      "Low"
    };
  };

  // Returns last `count` records from history list
  public func recentSlice(history : List.List<Types.PredictionRecord>, count : Nat) : [Types.PredictionRecord] {
    let arr = history.toArray();
    let size = arr.size();
    if (size == 0) { return [] };
    let startInt : Int = (size : Int) - (count : Int);
    let startNat : Nat = if (startInt < 0) { 0 } else { startInt.toNat() };
    arr.sliceToArray(startNat, size);
  };

  // Main prediction function implementing the full formula
  public func predict(input : Types.PredictionInput) : Types.PredictionResult {
    let basePerSqft = cityBasePricePerSqft(input.city);
    let locMult     = locationMultiplier(input.city, input.location);
    let propMult    = propertyTypeMultiplier(input.propertyType);
    let furnMult    = furnishingMultiplier(input.furnishing);
    let ageDisc     = ageDiscount(input.houseAge);
    let floorBon    = floorBonus(input.floor);
    let parkingBonusPerSqft = parkingBonus(input.parking, basePerSqft);

    // Formula: pricePerSqft = basePerSqft * locMult * propMult * furnMult * (1 - ageDisc) * (1 + floorBonus) + parkingBonusPerSqft
    let pricePerSqft =
      basePerSqft * locMult * propMult * furnMult
      * (1.0 - ageDisc)
      * (1.0 + floorBon)
      + parkingBonusPerSqft;

    // estimatedPrice in lakhs
    let estimatedPrice = (pricePerSqft * input.area) / 100000.0;

    let breakdown : Types.PriceBreakdown = {
      basePrice          = basePerSqft;
      locationMultiplier = locMult;
      amenityBonus       = furnMult;
      ageDiscount        = ageDisc;
      floorBonus         = floorBon;
    };

    {
      estimatedPrice;
      pricePerSqft;
      confidence = confidenceLevel(input);
      breakdown;
    };
  };
};
