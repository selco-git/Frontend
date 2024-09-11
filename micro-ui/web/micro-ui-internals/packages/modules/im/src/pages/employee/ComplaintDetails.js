import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useParams } from "react-router-dom";
import {
  BreakLine,
  Card,
  CardLabel,
  CardLabelDesc,
  CardSubHeader,
  ConnectingCheckPoints,
  CheckPoint,
  DisplayPhotos,
  MediaRow,
  LastRow,
  Row,
  StatusTable,
  PopUp,
  HeaderBar,
  ImageViewer,
  TextInput,
  TextArea,
  UploadFile,
  ButtonSelector,
  Toast,
  ActionBar,
  Menu,
  SubmitBar,
  Dropdown,
  Loader,
  LinkButton,
  Modal,
  SectionalDropdown,
  ImageUploadHandler,
  MultiUploadWrapper
} from "@egovernments/digit-ui-react-components";
import { Link } from "react-router-dom";

import { Close } from "../../Icons";
import { useTranslation } from "react-i18next";
import { isError, useQueryClient } from "react-query";
import StarRated from "../../components/timelineInstances/StarRated";

const MapView = (props) => {
  return (
    <div onClick={props.onClick}>
      <img src="https://via.placeholder.com/640x280" />
    </div>
  );
};

const Heading = (props) => {
  return <h1 className="heading-m">{props.label}</h1>;
};

const CloseBtn = (props) => {
  return (
    <div className="icon-bg-secondary" onClick={props.onClick}>
      <Close />
    </div>
  );
};

const TLCaption = ({ data, comments }) => {
  const { t } = useTranslation()
  return (
    <div>
      {data?.date && <p>{data?.date}</p>}
      <p>{data?.name}</p>
      <p>{data?.mobileNumber}</p>
      {data?.source && <p>{t("ES_COMMON_FILED_VIA_" + data?.source.toUpperCase())}</p>}
      {comments?.map( e => 
        <div className="TLComments">
          <h3>{t("WF_COMMON_COMMENTS")}</h3>
          <p style={{overflowX:"scroll"}}>{e}</p>
        </div>
      )}
    </div>
  );
};

const ComplaintDetailsModal = ({ workflowDetails, complaintDetails, close, popup, selectedAction, onAssign, tenant, t }) => {
  
  // RAIN-5692 PGR : GRO is assigning complaint, Selecting employee and assign. Its not getting assigned.
  // Fix for next action  assignee dropdown issue
  const stateArray = workflowDetails?.data?.initialActionState?.nextActions?.filter( ele => ele?.action == selectedAction );  
  const useEmployeeData = Digit.Hooks.pgr.useEmployeeFilter(
    tenant, 
    stateArray?.[0]?.assigneeRoles?.length > 0 ? stateArray?.[0]?.assigneeRoles?.join(",") : "",
    complaintDetails
    );
  const employeeData = useEmployeeData
    ? useEmployeeData.map((departmentData) => {
      return { heading: departmentData.department, options: departmentData.employees };
    })
    : null;

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [comments, setComments] = useState("");
  const [file, setFile] = useState(null);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const [uploadedFile, setUploadedFile] = useState(Array);
  const allowedFileTypes = /(docx|pdf|jpg|xlsx)$/i;
  const stateId = Digit.ULBService.getStateId();
  const [uploadedImages, setUploadedImagesIds] = useState(null)
  //const [uploadedFile, setUploadedFile] = useState(null);
  const [error, setError] = useState(null);
  const cityDetails = Digit.ULBService.getCurrentUlb();
  const [selectedReopenReason, setSelectedReopenReason] = useState(null);
  const [selectedRejectReason, setSelectedRejectReason] = useState(null);
  const state = Digit.ULBService.getStateId();
  const reopenReasonMenu = [t(`CS_REOPEN_OPTION_ONE`), t(`CS_REOPEN_OPTION_TWO`), t(`CS_REOPEN_OPTION_THREE`), t(`CS_REOPEN_OPTION_FOUR`)];
  const { isMdmsLoading, data: rejectReasons } = Digit.Hooks.pgr.useMDMS(state, "Incident", ["RejectReasons"]);
  // const uploadFile = useCallback( () => {

  //   }, [file]);
  useEffect(()=>{
    if(selectedAction==="REJECT"){
      const uuid= JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.uuid
      let name = JSON.parse(sessionStorage.getItem("Digit.User"))?.value?.info?.name;
      setSelectedEmployee({name, uuid})
    }
  }, [selectedAction])

  function onSelectEmployee(employee) {
    setSelectedEmployee(employee);
  }

  function addComment(e) { 
    if(e.target.value.length>256){
      setError(t("CS_COMMENT_LENGTH_LIMIT_EXCEED"))
    }
    else if(!/^[a-zA-Z0-9\s./,]*$/.test(e.target.value)){
      setError(t("CS_COMMENT_INVALID_CHARACTERS"))
    }
    else{
      setError(null);
      setComments(e.target.value);
    } 
  }

  function onSelectReopenReason(reason) {
    setSelectedReopenReason(reason);
  }
  function onSelectRejectReason(reason) {
    setSelectedRejectReason(reason);
  }
  const clearError=useCallback(()=>{
    setError("");
  },[])
  useEffect(()=>{
    if(error){
      const timeOut=setTimeout(()=>{
        clearError();
      }, 1000);
      return ()=>clearTimeout(timeOut);
    }

  }, [error, clearError]);
  function selectfile(e,newArr) {
    let file=[]
    if (e) {
      if(newArr.length >0)
      {
        file= newArr.map((e) =>{
          const newFile={
            documentType: e?.file?.type.includes(".sheet") ? ".xlsx": e?.file?.type.includes(".document")? ".docs": e?.file?.type,
            fileStoreId: e?.fileStoreId?.fileStoreId,
            documentUid: "",
            additionalDetails: {},
            };
          return newFile
        })
      }
      // const newFile={
      // documentType: e?.file?.type.includes(".sheet") ? ".xlsx": e?.file?.type.includes(".document")? ".docs": e?.file?.type,
      // fileStoreId: e?.fileStoreId?.fileStoreId,
      // documentUid: "",
      // additionalDetails: {},
      // };
      
      let temp = [...uploadedFile, ...file];
      
      const filterFileStoreIds = newArr.map(item => item.fileStoreId.fileStoreId);

      // Use a Set to remove duplicates and filter the documents array
      const seen = new Set();
      const filteredDocuments = temp.filter(document => {
        if (filterFileStoreIds.includes(document.fileStoreId) && !seen.has(document.fileStoreId)) {
          seen.add(document.fileStoreId);
          return true;
        }
        return false;
      });

      
      setUploadedFile(filteredDocuments);
      e && setFile(e.file);
    }
  }

  const getData = (state) => {  
    let data = Object.fromEntries(state);
    let newArr = Object.values(data);
    selectfile(newArr[newArr.length - 1],newArr);
  };
  return (
    <Modal
      headerBarMain={
        <Heading
          label={
            selectedAction === "ASSIGN" || selectedAction === "REASSIGN" 
              ? t("CS_ACTION_ASSIGN_TICKET")
              : selectedAction === "REJECT"
                ? t("CS_ACTION_REJECT_TICKET")
                : selectedAction === "REOPEN"
                  ? t("CS_COMMON_REOPEN")
                  :selectedAction==="RESOLVE"? t("CS_COMMON_RESOLVE"): selectedAction==="CLOSE" ? t("CS_COMMON_CLOSE") : t("CS_COMMON_SENDBACK")
          }
        />
      }
      headerBarEnd={<CloseBtn onClick={() => close(popup)} />}
      actionCancelLabel={t("CS_COMMON_CANCEL")}
      actionCancelOnSubmit={() => close(popup)}
      actionSaveLabel={
        selectedAction === "ASSIGN" || selectedAction === "REASSIGN"
          ? t("CS_COMMON_ASSIGN")
          : selectedAction === "REJECT"
            ? t("CS_COMMON_REJECT")
            : selectedAction === "REOPEN"
              ? t("CS_ACTION_REOPEN")
              :selectedAction==="RESOLVE"? t("CS_COMMON_RESOLVE_BUTTON"): selectedAction==="CLOSE" ? t("CS_COMMON_CLOSE") : t("CS_COMMON_SENDbACK")
      }
      
      
      actionSaveOnSubmit={() => {
        if((selectedAction==="REJECT") && selectedRejectReason===null){
          setError(t("CS_REJECT_REASON_COMMENTS"))
        }
       else if((selectedAction==="SENDBACK") && !comments){
            setError(t("CS_MANDATORY_COMMENTS"));
        }
        else if(selectedAction==="REOPEN" && selectedReopenReason===null){
          setError(t("CS_REOPEN_REASON_MANDATORY"))
        }
        else if(selectedAction==="ASSIGN" && selectedEmployee===null){
           setError(t("CS_ASSIGNEE_MANDATORY"))
        }
        else if(selectedAction==="RESOLVE" && (!comments || uploadedFile.length===0) ){
          setError(t("CS_MANDATORY_COMMENTS_AND_FILE_UPLOAD"));
        }
        else{
          
        onAssign(selectedEmployee, comments, uploadedFile, selectedReopenReason, selectedRejectReason);
        }
      }}
      error={error}
      setError={setError}
    >
      <Card style={{paddingTop:"0px"}}>
      {selectedAction === "REJECT" ? (
          <React.Fragment>
            <CardLabel>{t("CS_REJECT_COMPLAINT")}*</CardLabel>
            <Dropdown selected={selectedRejectReason} option={rejectReasons?.Incident?.RejectReasons} optionKey={"code"} select={onSelectRejectReason} />
          </React.Fragment>
        ) : null}

        {selectedAction === "REJECT" || selectedAction === "RESOLVE" || selectedAction === "REOPEN" || selectedAction==="SENDBACK" ? null : (
          <React.Fragment>
            
            <CardLabel>{t("CS_COMMON_EMPLOYEE_NAME")}*</CardLabel>
            
            {employeeData &&  <Dropdown  option={employeeData?.[0]?.options} optionKey="name" id="employee" selected={selectedEmployee} select={onSelectEmployee} required={true}/>}
           
          </React.Fragment>
        )}
        {selectedAction === "REOPEN" ? (
          <React.Fragment>
            <CardLabel>{t("CS_REOPEN_COMPLAINT")}*</CardLabel>
            <Dropdown selected={selectedReopenReason} option={reopenReasonMenu} select={onSelectReopenReason} />
          </React.Fragment>
        ) : null}
        {selectedAction !== "ASSIGN"  && selectedAction!=="REOPEN" ? (
        <CardLabel>{t("CS_COMMON_EMPLOYEE_COMMENTS")}*</CardLabel>
        ):<CardLabel>{t("CS_COMMON_EMPLOYEE_COMMENTS")}</CardLabel>}
        <TextArea name="comment" onChange={addComment} value={comments} />
        {selectedAction==="RESOLVE" ? (
           <CardLabel>{t("CS_ACTION_SUPPORTING_DOCUMENTS")}*</CardLabel>
        ):  <CardLabel>{t("CS_ACTION_SUPPORTING_DOCUMENTS")}</CardLabel>}
       
        {/* {selectedAction==="RESOLVE" ? (
        //   <CardLabelDesc>{t(`CS_UPLOAD_RESTRICTIONS`)}*</CardLabelDesc>
        // ) : <CardLabelDesc>{t(`CS_UPLOAD_RESTRICTIONS`)}</CardLabelDesc>} */}
        
        <MultiUploadWrapper 
          t={t} 
          module="Incident" 
          tenantId={complaintDetails?.incident?.tenantId || tenantId} 
          requestSpecifcFileRemoval={uploadedFile?.[0]}
          getFormState={(e) => getData(e)}
          allowedFileTypesRegex={(selectedAction==="RESOLVE") ?/(docx|doc|pdf|xlsx)$/i : /(pdf|jpg|jpeg|png)$/i}
          allowedMaxSizeInMB={5}
          acceptFiles= {(selectedAction==="RESOLVE") ? ".pdf, .xlsx, .docx, .doc": ".pdf, .jpg, .jpeg, .png"}
          ulb={complaintDetails?.incident?.tenantId || tenantId}
          />
        {selectedAction === "RESOLVE" ? <div style={{marginTop:"6px", fontSize:"13px", color:"#36454F"}}>{t("RESOLVE_RESOLUTION_REPORT")}</div> : <CardLabelDesc style={{marginTop:"8px", fontSize:"13px"}}> {t("CS_FILE_LIMIT")}</CardLabelDesc>}
      </Card>
    </Modal>
  );
};

export const ComplaintDetails = (props) => {
  let { id } = useParams();
  const { t } = useTranslation();
  const [fullscreen, setFullscreen] = useState(false);
  const [imageZoom, setImageZoom] = useState(null);
  const mobileDeviceWidth = 780;
  const [isMobileView, setIsMobileView] = React.useState(window.innerWidth <= mobileDeviceWidth);
  const onResize = () => {
    if (window.innerWidth <= mobileDeviceWidth) {
      if (!isMobileView) {
        setIsMobileView(true);
      }
    } else {
      if (isMobileView) {
        setIsMobileView(false);
      }
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", () => {
      onResize();
    });
    return () => {
      window.addEventListener("resize", () => {
        onResize();
      });
    };
  });
  // const [actionCalled, setActionCalled] = useState(false);
  const [toast, setToast] = useState(false);
  const tenantId = Digit.ULBService.getCurrentTenantId();
  const tenant =  Digit.SessionStorage.get("Employee.tenantId") == "pg"?  Digit.SessionStorage.get("IM_TENANTS").map(item => item.code).join(',') :Digit.SessionStorage.get("Employee.tenantId") 

  const { isLoading, complaintDetails, revalidate: revalidateComplaintDetails } = Digit.Hooks.pgr.useComplaintDetails({ tenant, id });

  const workflowDetails = Digit.Hooks.useWorkflowDetails({ tenant : id.split("/")[1], id :id.split("/")[0] , moduleCode: "Incident", role: "EMPLOYEE" });

  const [imagesToShowBelowComplaintDetails, setImagesToShowBelowComplaintDetails] = useState([])

  // RAIN-5692 PGR : GRO is assigning complaint, Selecting employee and assign. Its not getting assigned.
  // Fix for next action  assignee dropdown issue
  if (workflowDetails && workflowDetails?.data){
    workflowDetails.data.initialActionState=workflowDetails?.data?.initialActionState || {...workflowDetails?.data?.actionState } || {} ;
      workflowDetails.data.actionState = { ...workflowDetails.data };
    }
    if( complaintDetails)
    {
      complaintDetails.details.CS_COMPLAINT_DETAILS_TICKET_NO =  complaintDetails?.details?.CS_COMPLAINT_DETAILS_TICKET_NO.split("/")[0]

    }
   
  useEffect(()=>{
    if(workflowDetails){
      const {data:{timeline: complaintTimelineData}={}} = workflowDetails
      if(complaintTimelineData){

        const applyAction = complaintTimelineData.find(action => action.performedAction === "APPLY");
        const initiate = complaintTimelineData.find(action => action.performedAction === "INITIATE");
        if(!initiate)
        {
          const complaintTimelineDataNew = { ...applyAction, performedAction: "INITIATE", state: "PENDINGRESOLUTIONNEW", status: "PENDINGRESOLUTIONNEW" };
            
          complaintTimelineData.push(complaintTimelineDataNew)
        }
        const actionByCitizenOnComplaintCreation = complaintTimelineData?.find( e => e?.performedAction === "APPLY")
        const { thumbnailsToShow } = actionByCitizenOnComplaintCreation

        thumbnailsToShow ? setImagesToShowBelowComplaintDetails(thumbnailsToShow) : null
      }
    }
  },[workflowDetails])
  const [displayMenu, setDisplayMenu] = useState(false);
  const [popup, setPopup] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [assignResponse, setAssignResponse] = useState(null);
  const [loader, setLoader] = useState(false);
  const [rerender, setRerender] = useState(1);
  const client = useQueryClient();
  function popupCall(option) {
    setDisplayMenu(false);
    setPopup(true);
  }

  useEffect(() => {
    (async () => {
      const assignWorkflow = await Digit?.WorkflowService?.getByBusinessId(tenant, id);
    })();
  }, [complaintDetails]);

  const refreshData = async () => {
    await client.refetchQueries(["fetchInboxData"]);
    await workflowDetails.revalidate();
    await revalidateComplaintDetails();
  };

  useEffect(() => {
    (async () => {
      if (complaintDetails) {
        setLoader(true);
        await refreshData();
        setLoader(false);
      }
    })();
  }, []);

  function zoomView() {
    setFullscreen(!fullscreen);
  }

  function close(state) {
    switch (state) {
      case fullscreen:
        setFullscreen(!fullscreen);
        break;
      case popup:
        setPopup(!popup);
        break;
      default:
        break;
    }
  }

  function zoomImage(imageSource, index) {
    setImageZoom(imageSource);
  }
  function zoomImageWrapper(imageSource, index){
      if(imageSource.includes("small")){
        zoomImage(imagesToShowBelowComplaintDetails?.fullImage[index]);
      }
      else{
        window.open(imagesToShowBelowComplaintDetails?.fullImage[index]);
      }   
  }
  function onCloseImageZoom() {
    setImageZoom(null);
  }

  function onActionSelect(action) {
    setSelectedAction(action);
    switch (action) {
      case "ASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REASSIGN":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "RESOLVE":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REJECT":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "REOPEN":
        setPopup(true);
        setDisplayMenu(false);
      case "CLOSE":
        setPopup(true);
        setDisplayMenu(false);
        break;
      case "SENDBACK":
        setPopup(true);
        setDisplayMenu(false);
        break;
      default:
        setDisplayMenu(false);
    }
  }

  async function onAssign(selectedEmployee, comments, uploadedFile, selectedReopenReason, selectedRejectReason) {
    setPopup(false);
    const response = await Digit.Complaint.assign(complaintDetails, selectedAction, selectedEmployee, comments, uploadedFile, tenant, selectedReopenReason, selectedRejectReason);
    setAssignResponse(response);
    setToast(true);
    setLoader(true);
    await refreshData();
    setLoader(false);
    setRerender(rerender + 1);
    setTimeout(() => setToast(false), 10000);
  }

  function closeToast() {
    setToast(false);
  }

  if (isLoading || workflowDetails.isLoading || loader) {
    return <Loader />;
  }
  if (workflowDetails.isError) return <React.Fragment>{workflowDetails.error}</React.Fragment>;

  const getTimelineCaptions = (checkpoint, index, arr) => {

    let reopenCount = 0;
    let rejectCount = 0;
    let arrNew= arr.map((abc) => {
      if(abc.performedAction === "REOPEN")
      {
        let reopen=complaintDetails?.incident?.additionalDetail?.reopenreason
        let obj ={...abc, reopenreason:reopen?.reverse()[reopenCount]}
        reopen?.reverse()
        reopenCount +=1
        return obj
      }
      else if(abc.performedAction === "REJECT")
      {
        let rejectreason=complaintDetails?.incident?.additionalDetail?.rejectReason
        let obj ={...abc, rejectReason:rejectreason?.reverse()[rejectCount]}
        rejectreason?.reverse()
        rejectCount +=1
        return obj
      }
      else return abc
      
    })
    const arr1=arr
    const {wfComment: comment, thumbnailsToShow} = checkpoint;
    function zoomImageTimeLineWrapper(imageSource, index,thumbnailsToShow,arr){
      
      if(arr1[index]?.status == "RESOLVED")
      {
        window.open(arr1[index].thumbnailsToShow.fullImage[0], "_blank")
      }
      else {
        let newIndex=thumbnailsToShow.thumbs?.findIndex(link=>link===imageSource);
        zoomImage((newIndex>-1&&thumbnailsToShow?.fullImage?.[newIndex])||imageSource);
      }
      
    }
    const captionForOtherCheckpointsInTL = {
      date: checkpoint?.auditDetails?.lastModified,
      name: checkpoint?.assigner?.name,
      mobileNumber: checkpoint?.assigner?.mobileNumber,
      ...checkpoint.status === "COMPLAINT_FILED" && complaintDetails?.audit ? {
        source: complaintDetails.audit.source,
      } : {}
    }
    const isFirstPendingForAssignment = arr.length - (index + 1) === 1 ? true : false
    if (checkpoint.status === "PENDINGFORASSIGNMENT" && complaintDetails?.audit) {
      if(isFirstPendingForAssignment){
        const caption = {
          date: Digit.DateUtils.ConvertEpochToDate(complaintDetails.audit.details.createdTime),
        };
        return <TLCaption data={caption} comments={checkpoint?.wfComment}/>;
      } 
      else {
        const caption = {
          date: Digit.DateUtils.ConvertEpochToDate(complaintDetails.audit.details.lastModifiedTime),         
        };
        return <>
          {checkpoint?.wfComment ? <div>{checkpoint?.wfComment?.map( e => 
            <div className="TLComments">
              <h3>{t("WF_COMMON_COMMENTS")}</h3>
              <p>{e}</p>
            </div>
          )}</div> : null}
          {checkpoint.status!=="COMPLAINT_FILED" && checkpoint.performedAction!=="SENDBACK" ? (
            <div className="TLComments">
              <h3>{t("WF_REOPEN_REASON")}</h3>
              <h1>{arrNew[index]?.reopenreason}</h1>
            </div>
          ):null}
          {checkpoint.status==="REJECT" ? (
            <div className="TLComments">
              <h3>{t("WF_REJECT_REASON")}</h3>
              <h1>{arrNew[index]?.rejectReason}</h1>
            </div>
          ):null}
          {checkpoint.status !== "COMPLAINT_FILED" && thumbnailsToShow?.thumbs?.length > 0 ? <div className="TLComments">
            <h3>{t("CS_COMMON_ATTACHMENTS")}</h3>
            <DisplayPhotos srcs={thumbnailsToShow.thumbs} onClick={(src, index) => zoomImageTimeLineWrapper(src, index,thumbnailsToShow,arr)} />
          </div> : null}
          {caption?.date ? <TLCaption data={caption}/> : null}
        </>
      }
    }
   else if(checkpoint.status === "CLOSEDAFTERRESOLUTION")
    {      
      
    return <TLCaption data={""} comments={checkpoint?.wfComment}/>;

    }
    // return (checkpoint.caption && checkpoint.caption.length !== 0) || checkpoint?.wfComment?.length > 0 ? <TLCaption data={checkpoint?.caption?.[0]} comments={checkpoint?.wfComment} /> : null;
    return <>
      {comment ? <div>{comment?.map( e => 
        <div className="TLComments">
          <h3>{t("WF_COMMON_COMMENTS")}</h3>
          <p style={{overflowX:"scroll"}}>{e}</p>
        </div>
      )}</div> : null}
      {checkpoint.status !== "COMPLAINT_FILED" && checkpoint?.performedAction!=="INITIATE" && thumbnailsToShow?.thumbs?.length > 0 ? <div className="TLComments">
        <h3>{t("CS_COMMON_ATTACHMENTS")}</h3>
        <DisplayPhotos srcs={thumbnailsToShow.thumbs} onClick={(src, index) => zoomImageTimeLineWrapper(src, index,thumbnailsToShow,arr)} />
      </div> : null}
      {checkpoint.status==="REJECTED" ? (
        <div className="TLComments">
           <h3>{t("WF_REJECT_REASON")}</h3>
            <h1>{arrNew[index]?.rejectReason}</h1>
        </div>
      ):null}
      {captionForOtherCheckpointsInTL?.date ? <TLCaption data={captionForOtherCheckpointsInTL}/> : null}
      {(checkpoint.status == "CLOSEDAFTERRESOLUTION" && complaintDetails.workflow.action == "RATE" && index <= 1) && complaintDetails.audit.rating ? <StarRated text={t("CS_ADDCOMPLAINT_YOU_RATED")} rating={complaintDetails.audit.rating} />: null}
    </>
  }
return (
  <React.Fragment>
     <div style={{color:"#9e1b32", marginBottom:'10px', textAlign:"right", marginRight:"0px"}}>
    <Link to={`/digit-ui/employee/im/inbox`}>{t("CS_COMMON_BACK")}</Link></div> 
    <Card>
      
      <div style={{display:"flex", flexDirection:"column", gap:"5px"}}>
      <CardSubHeader>{t(`CS_HEADER_INCIDENT_SUMMARY`)}</CardSubHeader>
      <div style={{fontWeight:"bolder", fontSize: isMobileView ? "16px":"21px", marginTop: isMobileView? "20px": -20, marginBottom:"22px"}}>{t("CS_HEADER_TICKET_DETAILS")}</div>
      </div>
      

      {isLoading ? (
        <Loader />
      ) : (
        <StatusTable>
          {complaintDetails &&
            Object.keys(complaintDetails?.details).map((k, i, arr) => (
              <Row
                key={k}
                label={t(k)}
                text={
                  Array.isArray(complaintDetails?.details[k])
                    ? complaintDetails?.details[k].map((val) => (typeof val === "object" ? t(val?.code) : t(val)))
                    : t(complaintDetails?.details[k]) || "N/A"
                }
                last={arr.length - 1 === i}
              />
              
            ))}

          {1 === 1 ? null : (
            <MediaRow label="CS_COMPLAINT_DETAILS_GEOLOCATION">
              <MapView onClick={zoomView} />
            </MediaRow>
          )}
        </StatusTable>
      )}
      {imagesToShowBelowComplaintDetails?.thumbs ? (
        <div>
        <CardLabel style={{marginTop:'18px', fontWeight:'bolder'}}>{t("CS_TICKET_ADDITIONAL_DETAILS")}</CardLabel>
        <DisplayPhotos srcs={imagesToShowBelowComplaintDetails?.thumbs} onClick={(source, index) => zoomImageWrapper(source, index)} />
        </div>
      ) : null}
      <BreakLine />
      {workflowDetails?.isLoading && <Loader />}
      {!workflowDetails?.isLoading && (
        <React.Fragment>
          <CardSubHeader>{t(`CS_COMPLAINT_DETAILS_COMPLAINT_TIMELINE`)}</CardSubHeader>

          {workflowDetails?.data?.timeline && workflowDetails?.data?.timeline?.length === 1 ? (
            <CheckPoint isCompleted={true} label={t("CS_COMMON_" + workflowDetails?.data?.timeline[0]?.status)} />
          ) : (
            <ConnectingCheckPoints>
              {workflowDetails?.data?.timeline &&
                workflowDetails?.data?.timeline.map((checkpoint, index, arr) => {
                  return (
                    <React.Fragment key={index}>
                      <CheckPoint
                        keyValue={index}
                        isCompleted={index === 0}
                        label={t("CS_COMMON_" + checkpoint.status)}
                        customChild={getTimelineCaptions(checkpoint, index, arr)}
                      />
                    </React.Fragment>
                  );
                })}
            </ConnectingCheckPoints>
          )}
        </React.Fragment>
      )}
    </Card>
    {fullscreen ? (
      <PopUp>
        <div className="popup-module">
          <HeaderBar main={<Heading label="Complaint Geolocation" />} end={<CloseBtn onClick={() => close(fullscreen)} />} />
          <div className="popup-module-main">
            <img src="https://via.placeholder.com/912x568" />
          </div>
        </div>
      </PopUp>
    ) : null}
    {imageZoom ? <ImageViewer imageSrc={imageZoom} onClose={onCloseImageZoom} /> : null}
    {popup ? (
      <ComplaintDetailsModal
        workflowDetails={workflowDetails}
        complaintDetails={complaintDetails}
        close={close}
        popup={popup}
        selectedAction={selectedAction}
        onAssign={onAssign}
        tenantId={tenant}
        t={t}
      />
    ) : null}
    {toast && <Toast label={t(assignResponse ? `CS_ACTION_${selectedAction}_TEXT` : "CS_ACTION_ASSIGN_FAILED")} onClose={closeToast} />}
    {!workflowDetails?.isLoading && workflowDetails?.data?.nextActions?.length > 0 && (
      <ActionBar>
        {displayMenu && workflowDetails?.data?.nextActions ? (
          <Menu options={workflowDetails?.data?.nextActions.map((action) => action.action)} t={t} onSelect={onActionSelect} />
        ) : null}
        <SubmitBar label={t("WF_TAKE_ACTION")} onSubmit={() => setDisplayMenu(!displayMenu)} />
      </ActionBar>
    )}
  </React.Fragment>
);
};