import classnames from 'classnames';
import {
    CENTER_ALIGNED_SECTIONS,
    COMBO_PLATE_SECTIONS,
    DRINKS,
    LUNCHEON_SPECIALS,
    MAJOR_SECTIONS,
    PU_PU_PLATTERS,
    SECTIONS_WITH_COLUMNS
} from "../../constants";
import { Price } from '../Price/Price';
import { PriceHeader } from '../PriceHeader/PriceHeader';
import { MenuItems } from '../MenuItems/MenuItems';
import "./MenuSection.css";

const PuPuPlatterDescription = ({ description }) => {
    const substitutionCostIndex = description.indexOf("($");
    const substitutionCost = substitutionCostIndex !== -1 ? description.substring(substitutionCostIndex) : ''
    const appetizers = substitutionCostIndex !== -1 ? description.substring(0, substitutionCostIndex) : ''
    const descriptionList = appetizers.split(',');

    return (
        <>
            {appetizers &&
                <div className="puPuPlatterDescription">
                    {descriptionList.map(appetizer => {
                        return <div key={appetizer}>{appetizer}</div>
                    })}
                </div>
            }
            {substitutionCost}
        </>
    )
}

const PuPuPlatterSection = ({ items, name }) => {
    return (
        <div className="puPuPlatterItem">
            {items.map(item => {
                const { prices, description } = item;
                return (
                    <div key={name} className="puPuPlatterSection">
                        <div className="puPuPlatterHeader">
                            <h3>{name}</h3>
                            <Price prices={prices} />
                        </div>
                        <div className="menuItemDetails">
                            {description &&
                                <div className="menuItemDescription">
                                    <PuPuPlatterDescription description={description} />
                                </div>
                            }
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const ComboPlateDescription = () => {
    return (
        <h4>
            Served with Roast Pork Fried Rice/White Rice and Appetizer Choice of Egg Roll (1), Chicken Wings (2), Chicken Fingers (3), Crab Rangoons (3)
        </h4>
    )
}

export const MenuSection = ({ section }) => {
    if (!section) {
        return null;
    }

    const { name, items, hasPriceHeader } = section;
    if (PU_PU_PLATTERS.includes(name)) {
        return <PuPuPlatterSection items={items} name={name} />
    }

    return (
        <div className={classnames("menuSection", {
            isColumn: SECTIONS_WITH_COLUMNS.includes(name),
            isDrinksSection: name === DRINKS,
            isComboSection: COMBO_PLATE_SECTIONS.includes(name)
        })}>
            {COMBO_PLATE_SECTIONS.includes(name) &&
                <div className="luncheonSpecialsDescription">
                    {name === LUNCHEON_SPECIALS ? 'Served Daily 11:00am to 3:00pm' : <br />}
                </div>
            }
            {MAJOR_SECTIONS.includes(name) ? <h2 className={classnames({ isCenter: CENTER_ALIGNED_SECTIONS.includes(name) })}>{name}</h2> : <h3>{name}</h3>}
            {COMBO_PLATE_SECTIONS.includes(name) && <ComboPlateDescription />}
            {hasPriceHeader && <PriceHeader />}
            <MenuItems items={items} sectionName={name} />
        </div>
    )
}