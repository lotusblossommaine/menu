export const MENU_SPREADSHEET_NAME = 'FINAL';
export const BANNER_SPREADSHEET_NAME = 'FINAL_ANNOUCEMENT';

const APPETIZERS = 'Appetizers';
const PU_PU_PLATTER_FOR_ONE = 'Pu Pu Platter (for 1)';
const PU_PU_PLATTER_FOR_TWO = 'Pu Pu Platter (for 2)';
const FRIED_RICE = 'Fried Rice';
const LO_MEIN = 'Lo Mein';
const CHOW_MEIN = 'Chow Mein';
const CHOP_SUEY = 'Chop Suey';
const EGG_FOO_YONG = 'Egg Foo Yong';
const CHICKEN = 'Chicken';
const BEEF = 'Beef';
const SEAFOOD = 'Seafood';
const SOUPS = 'Soups';
const HEALTHY_SELECTIONS = 'Healthy Selections';
const CHILDREN_COMBINATIONS = 'Children Combinations';
const SIDE_ORDERS = 'Side Orders';
export const LUNCHEON_SPECIALS = 'Luncheon Specials';
const COMBINATION_PLATES = 'Combination Plates';
export const SUGGESTIONS = 'Suggestions';

export const DRINKS = 'Drinks';
export const MIXED_DRINKS = 'Mixed Drinks';
export const BEER = 'Beer';
export const WINE = 'Wine';
export const NON_ALCOHOLIC_BEER_OPTION = 'Non-Alcoholic Beer Option';
export const BEVERAGES = 'Beverages';

export const PU_PU_PLATTERS = [PU_PU_PLATTER_FOR_TWO, PU_PU_PLATTER_FOR_ONE];
export const COMBO_PLATE_SECTIONS = [LUNCHEON_SPECIALS, COMBINATION_PLATES];
export const FOOD_SECTION_LIST = [
    APPETIZERS,
    ...PU_PU_PLATTERS,
    FRIED_RICE,
    LO_MEIN,
    CHOW_MEIN,
    CHOP_SUEY,
    EGG_FOO_YONG,
    CHICKEN, BEEF,
    SEAFOOD,
    SOUPS,
    HEALTHY_SELECTIONS,
    CHILDREN_COMBINATIONS,
    SIDE_ORDERS
];
export const DRINKS_SECTION_LIST = [DRINKS, MIXED_DRINKS, BEER, WINE, NON_ALCOHOLIC_BEER_OPTION, BEVERAGES];

export const NO_SMALL_SECTIONS_FOR_DINE_IN = [FRIED_RICE, LO_MEIN, CHOW_MEIN];
export const SECTIONS_WITH_NO_SIZE_HEADER = [DRINKS, BEVERAGES];
export const SECTIONS_WITH_COLUMNS = [DRINKS, MIXED_DRINKS];
export const SECTIONS_WITH_WHITE_ITEMS = [...COMBO_PLATE_SECTIONS, SUGGESTIONS];
export const MAJOR_SECTIONS = [...COMBO_PLATE_SECTIONS, SUGGESTIONS, DRINKS, BEVERAGES];
export const CENTER_ALIGNED_SECTIONS = [SUGGESTIONS, BEVERAGES]