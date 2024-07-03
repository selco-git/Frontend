import React, {useState, useEffect} from "react";
import { LabelFieldPair, CardLabel, TextInput, CardLabelError, Dropdown } from "@egovernments/digit-ui-react-components";
import { useLocation } from "react-router-dom";
import { MultiSelectDropdown } from "@egovernments/digit-ui-react-components";
const SelectEmployeeCorrespondenceAddress = ({ t, config, onSelect, formData = {}, userType, register, errors }) => {
    const { pathname: url } = useLocation();
    const tenantId = Digit.ULBService.getCurrentTenantId();
  const state = Digit.ULBService.getStateId();
  const [district, setDistrict]=useState(formData?.SelectEmployeeCorrespondenceAddress?.district?.key? formData?.SelectEmployeeCorrespondenceAddress?.district?.key:null);
  const [block, setBlock]=useState(null);
  
  const { isMdmsLoading, data: mdmsData } = Digit.Hooks.pgr.useMDMS(state, "Incident", ["District","Block"]);
  const {  data: phcMenu  } = Digit.Hooks.pgr.useMDMS(state, "tenant", ["tenants"]);
  const [districtMenu, setDistrictMenu]=useState([]);
  const [blockMenu, setBlockMenu]=useState([]);
  const [selectTenant, setSelectTenant] =useState(Digit.SessionStorage.get("Employee.tenantId") || null)
  useEffect(()=>{
    let tenants =Digit.SessionStorage.get("Employee.tenantId")
    setSelectTenant(tenants)
  },[])
  useEffect(()=>{
    const fetchDistrictMenu=async()=>{
      const response=phcMenu?.Incident?.District;
      if(response){
        const uniqueDistricts={};
        const districts=response.filter(def=>{
          if(!uniqueDistricts[def.code]){
            uniqueDistricts[def.code]=true;
            return true;
          }
          return false;
        });
        districts.sort((a,b)=>a.name.localeCompare(b.name))
        
            setDistrictMenu(
              districts.map(def=>({
             
             key:t(def.code), 
              name:t(def.name) 
           }))
            );
        }
      
  
    };
    fetchDistrictMenu();
  }, [state, mdmsData,t]);
 
  useEffect(()=>{
   
    const fetchBlockMenu=async()=>{
      if(district!==null){
      const response=phcMenu?.Incident?.Block;
      
      if(response){
        const blocks=response.filter(block=>block.districtCode===district.key)
        
        //const foundBlock=block.find(item=>item.code===response)
        blocks.sort((a,b)=>a.name.localeCompare(b.name))
            setBlockMenu(
              blocks.map(def=>({
             
             key:t(def.code), 
              name:t(def.name) 
           }))
            );
        }
      }
        else{
          setBlockMenu([]);
        }
      
  
    };
    fetchBlockMenu();
  }, [district, mdmsData,t]); 
  
  useEffect(async () => {

    if (selectTenant && selectTenant !== "pg") {
      let tenant = Digit.SessionStorage.get("HRMS_TENANTS")
     
      const selectedTenantData = tenant.find(item => item.code === selectTenant);
      const selectedDistrict = {
        key: t(selectedTenantData.city.districtCode),
        name: t(selectedTenantData.city.districtCode.charAt(0).toUpperCase() + selectedTenantData.city.districtCode.slice(1).toLowerCase()),
      };
      const selectedBlock = {
        key: t(selectedTenantData.city.blockCode.split(".")[1].toUpperCase()),
        name: t(selectedTenantData.city.blockCode.split(".").pop().charAt(0).toUpperCase() + selectedTenantData.city.blockCode.split(".").pop().slice(1))
      };
        selectDistrict(selectedDistrict);
        selectBlock(selectedBlock)
       
    }
  }, [selectTenant,mdmsData,state]);
  const inputs = [
    {
      label: "HR_CORRESPONDENCE_ADDRESS_LABEL",
      type: "text",
      name: "correspondenceAddress",
      validation: {
        pattern: Digit.Utils.getPattern('Address'),
        isRequired: true,
        title: t("CORE_COMMON_APPLICANT_NAME_INVALID"),
      },
      isMandatory: true,
    },
  ];

  function setValue(value, input) {
    onSelect(config.key, { ...formData[config.key], [input]: value });
  }
  const selectDistrict=(value)=>{
    console.log("districtvalue", value)
    setDistrict(value)
    setValue(value, "district");
    setBlock(null);
  }

  const selectBlock=(value)=>{
    setBlock(value)
    setValue(value, "block");
  };
  
  return (
    <div>
      {inputs?.map((input, index) => {
        let currentValue=formData && formData[config.key] && formData[config.key][input.name]||'';
        return(<React.Fragment key={index}>
          {errors[input.name] && <CardLabelError>{t(input.error)}</CardLabelError>}
          <LabelFieldPair>
            <CardLabel className="card-label-smaller">
              {t(input.label)}
              {input.isMandatory ? " * " : null}
            </CardLabel>
            <div className="field">
              <TextInput
                key={input.name}
                value={formData && formData[config.key] ? formData[config.key][input.name] : undefined}
                onChange={(e) => setValue(e.target.value, input.name)}
                disable={false}
                defaultValue={undefined}
                {...input.validation}
              />
               {currentValue&&currentValue.length>0&&!currentValue.match(Digit.Utils.getPattern('Address'))&&<CardLabelError style={{ width: "100%", marginTop: '-15px', fontSize: '16px', marginBottom: '12px'}}>{t("CORE_COMMON_APPLICANT_ADDRESS_INVALID")}</CardLabelError>}
            </div>
                      </LabelFieldPair>
        </React.Fragment>
      )})}
      <div>
      <LabelFieldPair>
          <CardLabel className="card-label-smaller">
            {t("HR_CORRESPONDENCE_DISTRICT_LABEL")}
            
          </CardLabel>
          <Dropdown
            className="form-field"
            isMandatory="true"
            selected={district}
            option={districtMenu}
            select={selectDistrict}
            optionKey="name"
            disable={selectTenant && selectTenant !== "pg"?true:false}
            t={t}
          />
        </LabelFieldPair>
        <LabelFieldPair>
          <CardLabel className="card-label-smaller">
            {t("HR_CORRESPONDENCE_BLOCK_LABEL")}
            
          </CardLabel>
          <Dropdown
            className="form-field"
            isMandatory={true}
            selected={block}
            option={blockMenu}
            select={selectBlock}
            optionKey="name"
            disable={selectTenant && selectTenant !== "pg"?true:false}
            t={t}
          />
        </LabelFieldPair>
        
      </div>
    </div>
  );
};

export default SelectEmployeeCorrespondenceAddress;
