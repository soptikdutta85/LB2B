import LB2B_PLP_SortDirectionCharAtoZ from "@salesforce/label/c.LB2B_PLP_SortDirectionCharAtoZ";
import LB2B_PLP_SortDirectionCharZtoA from "@salesforce/label/c.LB2B_PLP_SortDirectionCharZtoA";
import LB2B_PLP_SortDirectionDateAsc from "@salesforce/label/c.LB2B_PLP_SortDirectionDateAsc";
import LB2B_PLP_SortDirectionDateDesc from "@salesforce/label/c.LB2B_PLP_SortDirectionDateDesc";
import LB2B_PLP_SortDirectionNumberAsc from "@salesforce/label/c.LB2B_PLP_SortDirectionNumberAsc";
import LB2B_PLP_SortDirectionNumberDesc from "@salesforce/label/c.LB2B_PLP_SortDirectionNumberDesc";
import LB2B_PLP_SortDirectionPriceAsc from "@salesforce/label/c.LB2B_PLP_SortDirectionPriceAsc";
import LB2B_PLP_SortDirectionPriceDesc from "@salesforce/label/c.LB2B_PLP_SortDirectionPriceDesc";
import LB2B_PLP_SortDirectionCustom1Asc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom1Asc";
import LB2B_PLP_SortDirectionCustom1Desc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom1Desc";
import LB2B_PLP_SortDirectionCustom2Asc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom2Asc";
import LB2B_PLP_SortDirectionCustom2Desc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom2Desc";
import LB2B_PLP_SortDirectionCustom3Asc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom3Asc";
import LB2B_PLP_SortDirectionCustom3Desc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom3Desc";
import LB2B_PLP_SortDirectionCustom4Asc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom4Asc";
import LB2B_PLP_SortDirectionCustom4Desc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom4Desc";
import LB2B_PLP_SortDirectionCustom5Asc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom5Asc";
import LB2B_PLP_SortDirectionCustom5Desc from "@salesforce/label/c.LB2B_PLP_SortDirectionCustom5Desc";
import LB2B_PLP_SortFieldDateAdded from "@salesforce/label/c.LB2B_PLP_SortFieldDateAdded";
import LB2B_PLP_SortFieldName from "@salesforce/label/c.LB2B_PLP_SortFieldName";
import LB2B_PLP_SortFieldPrice from "@salesforce/label/c.LB2B_PLP_SortFieldPrice";
import LB2B_PLP_SortFieldRelevance from "@salesforce/label/c.LB2B_PLP_SortFieldRelevance";
import LB2B_PLP_SortFieldSequence from "@salesforce/label/c.LB2B_PLP_SortFieldSequence";
import LB2B_PLP_SortFieldSku from "@salesforce/label/c.LB2B_PLP_SortFieldSku";
import LB2B_PLP_SortFieldCustom1 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom1";
import LB2B_PLP_SortFieldCustom2 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom2";
import LB2B_PLP_SortFieldCustom3 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom3";
import LB2B_PLP_SortFieldCustom4 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom4";
import LB2B_PLP_SortFieldCustom5 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom5";
import LB2B_PLP_SortFieldCustom6 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom6";
import LB2B_PLP_SortFieldCustom7 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom7";
import LB2B_PLP_SortFieldCustom8 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom8";
import LB2B_PLP_SortFieldCustom9 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom9";
import LB2B_PLP_SortFieldCustom10 from "@salesforce/label/c.LB2B_PLP_SortFieldCustom10";
import * as UTILITIES from 'c/utilities';
  
export function getLabel(labelName) {

    if(!labelName) {
        return 'No Custom Label Defined';
    }

    if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCharAtoZ')) {
        return LB2B_PLP_SortDirectionCharAtoZ;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCharZtoA')) {
        return LB2B_PLP_SortDirectionCharZtoA;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionDateAsc')) {
        return LB2B_PLP_SortDirectionDateAsc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionDateDesc')) {
        return LB2B_PLP_SortDirectionDateDesc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionNumberAsc')) {
        return LB2B_PLP_SortDirectionNumberAsc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionNumberDesc')) {
        return LB2B_PLP_SortDirectionNumberDesc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionPriceAsc')) {
        return LB2B_PLP_SortDirectionPriceAsc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionPriceDesc')) {
        return LB2B_PLP_SortDirectionPriceDesc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom1Asc')) {
        return LB2B_PLP_SortDirectionCustom1Asc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom1Desc')) {
        return LB2B_PLP_SortDirectionCustom1Desc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom2Asc')) {
        return LB2B_PLP_SortDirectionCustom2Asc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom2Desc')) {
        return LB2B_PLP_SortDirectionCustom2Desc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom3Asc')) {
        return LB2B_PLP_SortDirectionCustom3Asc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom3Desc')) {
        return LB2B_PLP_SortDirectionCustom3Desc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom4Asc')) {
        return LB2B_PLP_SortDirectionCustom4Asc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom4Desc')) {
        return LB2B_PLP_SortDirectionCustom4Desc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom5Asc')) {
        return LB2B_PLP_SortDirectionCustom5Asc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortDirectionCustom5Desc')) {
        return LB2B_PLP_SortDirectionCustom5Desc;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldDateAdded')) {
        return LB2B_PLP_SortFieldDateAdded;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldName')) {
        return LB2B_PLP_SortFieldName;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldPrice')) {
        return LB2B_PLP_SortFieldPrice;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldRelevance')) {
        return LB2B_PLP_SortFieldRelevance;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldSequence')) {
        return LB2B_PLP_SortFieldSequence;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldSku')) {
        return LB2B_PLP_SortFieldSku;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom1')) {
        return LB2B_PLP_SortFieldCustom1;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom2')) {
        return LB2B_PLP_SortFieldCustom2;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom3')) {
        return LB2B_PLP_SortFieldCustom3;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom4')) {
        return LB2B_PLP_SortFieldCustom4;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom5')) {
        return LB2B_PLP_SortFieldCustom5;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom6')) {
        return LB2B_PLP_SortFieldCustom6;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom7')) {
        return LB2B_PLP_SortFieldCustom7;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom8')) {
        return LB2B_PLP_SortFieldCustom8;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom9')) {
        return LB2B_PLP_SortFieldCustom9;
    }
    else if(UTILITIES.compare(labelName, 'LB2B_PLP_SortFieldCustom10')) {
        return LB2B_PLP_SortFieldCustom10;
    }
    else {
        return 'No Custom Label Defined';
    }
};