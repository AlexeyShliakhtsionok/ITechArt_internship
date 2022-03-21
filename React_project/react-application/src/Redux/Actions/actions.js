import * as TYPES from './actionTypes';
const host = 'https://localhost:7275';

// Authorization of employees ==========================================

export function EmployeeAutorization(email, password) {
  const requestURL = `${host}/Employee/GetToken?employeeEmail=${email}&password=${password}`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'post',
    })
      .then((response) => {
        if (!response.ok) {
          dispatch(EmployeeAuthorizationFailed());
          dispatch(SetActiveMenu('promotionsPage'));
          alert('Incorrect login or password. Try again...');
          throw new Error(response.errorText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(EmployeeAutorizationSuccess(data));
      });
  };
}

export function EmployeeAutorizationSuccess(data) {
  return {
    type: TYPES.EMPLOYEE_AUTORIZATION_SUCCESS,
    payload: data,
  };
}

export function EmployeeAuthorizationFailed() {
  return {
    type: TYPES.EMPLOYEE_AUTHORIZATION_FAILED,
  };
}

export function EmployeeLogout() {
  return {
    type: TYPES.EMPLOYEE_LOGOUT,
  };
}

//==============================================
//==============================================
//Get paged data of current table

export function FeetchMainTableData(
  activeMenu,
  itemsPerPage = 12,
  pageNumber = 1,
  sortOrder,
) {
  var options = `?elementsPerPage=${itemsPerPage}&pageNumber=${pageNumber}&sortBy=${sortOrder}`;
  var requestURL;
  switch (activeMenu) {
    case 'clientsPage':
      requestURL = `${host}/Client/GetAllClients${options}`;
      break;
    case 'materialsPage':
      requestURL = `${host}/Material/GetAllMaterials${options}`;
      break;
    case 'servicesPage':
      requestURL = `${host}/Procedure/GetAllProcedures${options}`;
      break;
    case 'ordersPage':
      requestURL = `${host}/Order/GetAllOrders${options}`;
      break;
    case 'donedOrdersPage':
      requestURL = `${host}/Order/GetAllDonedOrders${options}`;
      break;
    case 'stagedOrdersPage':
      requestURL = `${host}/Order/GetAllStagedOrders${options}`;
      break;
    case 'feedbacksPage':
      requestURL = `${host}/Feedback/GetAllFeedbacks${options}`;
      break;
    case 'staffPage':
      requestURL = `${host}/Employee/GetAllEmployees${options}`;
      break;
    case 'ourStaffPage':
      requestURL = `${host}/Employee/GetAllEmployees${options}`;
      break;
    default:
      break;
  }
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchMainTableDataSuccess(data, activeMenu, sortOrder));
      });
  };
}

export function FeetchAllProcedureTypes() {
  var requestURL = `${host}/ProcedureType/GetAllProcedureTypes`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchMainTableDataSuccess(data, 'procedureTypesPage'));
      });
  };
}

export function FeetchAllMediafiles(activeMenu, mediafileType, employeeId) {
  var requestURL = `${host}/MediaFile/GetAllMediaFiles?type=${mediafileType}&employeeId=${employeeId}`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchMainTableDataSuccess(data, activeMenu));
      });
  };
}

export function FeetchMainTableDataSuccess(data, activeMenu, sortOrder) {
  return {
    type: TYPES.FETCH_TABLE_DATA_SUCCESS,
    payload: data,
    identifier: activeMenu,
    sortBy: sortOrder,
  };
}

//========================================================
//========================================================
//Get the data of choosen record of the table by ID

export function FetchActiveRecordData(id, activeMenu) {
  var requestURL;
  switch (activeMenu) {
    case 'clientsPage':
      requestURL = `${host}/Client/GetClientById?id=${id}`;
      break;
    case 'materialsPage':
      requestURL = `${host}/Material/GetMaterialById?id=${id}`;
      break;
    case 'servicesPage':
      requestURL = `${host}/Procedure/GetServiceById?id=${id}`;
      break;
    case 'serviceTypesPage':
      requestURL = `${host}/ProcedureType/GetProcedureTypeById?id=${id}`;
      break;
    case 'ordersPage':
      requestURL = `${host}/Order/GetOrderById?id=${id}`;
      break;
    case 'feedbacksPage':
      requestURL = `${host}/Feedback/GetFeedbackById?id=${id}`;
      break;
    case 'staffPage':
      requestURL = `${host}/Employee/GetEmployeeById?id=${id}`;
      break;
    case 'mediaFilesPage':
      requestURL = `${host}/MediaFile/GetFileById?id=${id}`;
      break;
    default:
      break;
  }
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FetchActiveRecordDataSuccess(data));
      });
  };
}

export function FetchClientByEmail(email) {
  var requestURL = `${host}/Client/GetClientByEmail?email=${email}`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          dispatch(FetchActiveRecordDataSuccess('Not found'));
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FetchActiveRecordDataSuccess(data));
      });
  };
}

export function FetchActiveRecordDataSuccess(data) {
  return {
    type: TYPES.SINGLE_RECORD_FETCH_DATA_SUCCESS,
    payload: data,
  };
}

//Active identifier setting
export function SetActiveIdentifier(id) {
  return {
    type: TYPES.ACTIVE_ID_SET,
    payload: id,
  };
}
//========================================================
//========================================================
//Delete the data of choosen record of the table

export function DeleteServiceType(id) {
  var requestURL = `${host}/ProcedureType/DeleteProcedureTypeById?id=${id}`;
  return (dispatch) => {
    fetch(requestURL, { method: 'post', cors: 'no-cors' }).then(() =>
      dispatch(FeetchMainTableData('servicesPage')),
    );
  };
}

export function DeleteFeedback(id) {
  var requestURL = `${host}/Feedback/DeleteFeedbackById?id=${id}`;
  return (dispatch) => {
    fetch(requestURL, { method: 'post', cors: 'no-cors' }).then(
      () => dispatch(FeetchMainTableData('feedbacksPage')),
      dispatch(CheckUnwachedFeedbacks()),
      dispatch(CheckUnprocessedOrders()),
    );
  };
}

export function DeleteData(id, activeMenu) {
  var requestURL;
  switch (activeMenu) {
    case 'clientsPage':
      requestURL = `${host}/Client/DeleteClientById?id=${id}`;
      break;
    case 'materialsPage':
      requestURL = `${host}/Material/DeleteMaterialById?id=${id}`;
      break;
    case 'servicesPage':
      requestURL = `${host}/Procedure/DeleteServiceById?id=${id}`;
      break;
    case 'serviceTypesPage':
      requestURL = `${host}/ProcedureType/DeleteProcedureTypeById?id=${id}`;
      break;
    case 'ordersPage':
      requestURL = `${host}/Order/DeleteOrderById?id=${id}`;
      break;
    case 'profilesPage':
      requestURL = `${host}/Profile/DeleteProfileById?id=${id}`;
      break;
    case 'promoPage':
      requestURL = `${host}/Profile/DeleteProfileById?id=${id}`;
      break;
    case 'staffPage':
      requestURL = `${host}/Employee/DeleteEmployeeById?id=${id}`;
      break;
    default:
      break;
  }
  return (dispatch) => {
    fetch(requestURL, { method: 'post', cors: 'no-cors' }).then(() =>
      dispatch(FeetchMainTableData(activeMenu)),
    );
  };
}

//========================================================
//========================================================
// Update the data of choosen record of the table

export function UpdateProcedureType(dataObject) {
  var requestURL = `${host}/ProcedureType/UpdateProcedureType`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData('servicesPage')));
  };
}

export function UpdateFeedback(activeMenu, dataObject) {
  var requestURL = `${host}/Feedback/UpdateFeedback`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        dispatch(FeetchMainTableData(activeMenu));
        dispatch(CheckUnwachedFeedbacks());
        dispatch(CheckUnprocessedOrders());
      });
  };
}

export function UpdateData(activeMenu, dataObject) {
  var requestURL;
  switch (activeMenu) {
    case 'clientsPage':
      requestURL = `${host}/Client/UpdateClient`;
      break;
    case 'materialsPage':
      requestURL = `${host}/Material/UpdateMaterial`;
      break;
    case 'servicesPage':
      requestURL = `${host}/Procedure/UpdateService`;
      break;
    case 'ordersPage':
      requestURL = `${host}/Order/UpdateOrder`;
      break;
    case 'staffPage':
      requestURL = `${host}/Employee/UpdateEmployee`;
      break;
    default:
      break;
  }
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        dispatch(FeetchMainTableData(activeMenu));
      });
  };
}

export function UpdateMaterialAmount(dataObject) {
  var requestURL = `${host}/Material/UpdateMaterialAmount`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function UpdateOrderStatus(id) {
  var requestURL = `${host}/Order/UpdateOrderStatus`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData('donedOrdersPage')));
  };
}

export function ConfirmOrder(id) {
  var requestURL = `${host}/Order/ConfirmOrder`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(id),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => {
        dispatch(FeetchMainTableData('ordersPage'));
        dispatch(CheckUnprocessedOrders());
      });
  };
}

//========================================================
//========================================================
//Add new data

export function CreateNewProcedureType(dataObject) {
  var requestURL = `${host}/ProcedureType/CreateProcedureType`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData('servicesPage')));
  };
}

export function CreateNewManufacturer(dataObject) {
  var requestURL = `${host}/MaterialManufacturer/CreateMaterialManufacturer`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData('materialsPage')));
  };
}

export function CreateFeedback(activeMenu, dataObject) {
  var requestURL = `${host}/Feedback/CreateFeedback`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(GetAllApprovedFeedbacks(activeMenu)));
  };
}

export function CreateClientFromMain(dataObject) {
  var requestURL = `${host}/Client/CreateClient`;

  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData('ordersPage')));
  };
}

export function AddData(activeMenu, dataObject) {
  var requestURL;
  switch (activeMenu) {
    case 'clientsPage':
      requestURL = `${host}/Client/CreateClient`;
      break;
    case 'materialsPage':
      requestURL = `${host}/Material/CreateMaterial`;
      break;
    case 'servicesPage':
      requestURL = `${host}/Procedure/CreateProcedure`;
      break;
    case 'ordersPage':
      requestURL = `${host}/Order/CreateOrder`;
      break;
    case 'feedbacksPage':
      requestURL = `${host}/Feedback/CreateFeedback`;
      break;
    case 'staffPage':
      requestURL = `${host}/Employee/CreateEmployee`;
      break;
    default:
      break;
  }
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          alert('Some of the optional fields are empty! Adding failed.');
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .then(() => dispatch(FeetchMainTableData(activeMenu)));
  };
}

//========================================================
//========================================================
// Modal windows states processing functions

export function SetEditModalState() {
  return {
    type: TYPES.EDIT_STATE,
  };
}

export function SetUpdateModalState() {
  return {
    type: TYPES.UPDATE_MODAL_WINDOW_STATE,
  };
}

export function SetCreateModalState() {
  return {
    type: TYPES.CREATE_MODAL_WINDOW_STATE,
  };
}

export function SetLoginModalState() {
  return {
    type: TYPES.LOGIN_MODAL_WINDOW_STATE,
  };
}

export function SetProcedureTypeCreateModalState() {
  return {
    type: TYPES.CREATE_PROCEDURE_TYPE_MODAL_WINDOW_STATE,
  };
}

export function SetProcedureTypeUpdateModalState() {
  return {
    type: TYPES.UPDATE_PROCEDURE_TYPE_MODAL_WINDOW_STATE,
  };
}
//========================================================
//========================================================
// Order creation and updating functions
// Feetcing of procedures by their types (for responsive select-list content change)
export function GetProceduresByType(id) {
  return (dispatch) => {
    fetch(`${host}/Procedure/GetAllProceduresByType?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchProcedureSuccess(data));
      });
  };
}

export function FeetchProcedureSuccess(data) {
  return {
    type: TYPES.PROCEDURE_FETCH_DATA_SUCCESS,
    payload: data,
  };
}

// Fetching of employees by procedures types (for responsive select-list content change)
export function GetEmployeesByProcedureType(id) {
  return (dispatch) => {
    fetch(`${host}/Employee/GetAllByProcedureType?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchEmployeesSuccess(data));
      });
  };
}

export function FeetchEmployeesSuccess(data) {
  return {
    type: TYPES.EMPLOYEE_FETCH_DATA_SUCCESS,
    payload: data,
  };
}

// Fetching of schedule with avaliable time intervals
export function GetAvaliableTimes(id, date, procedureId, open, close) {
  return (dispatch) => {
    fetch(
      `${host}/Order/GetScheduleOfEmployee?id=${id}&chosenDate=${date}&procedureId=${procedureId}&open=${open}&close=${close}`,
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchAvaliableTimesSuccess(data));
      });
  };
}

export function FeetchAvaliableTimesSuccess(data) {
  return {
    type: TYPES.SCHEDULE_FETCH_DATA_SUCCESS,
    payload: data,
  };
}

// Setting of active day and procedure during making order

export function SetActiveDate(data) {
  return {
    type: TYPES.SET_ACTIVE_DATE,
    payload: data,
  };
}

export function SetActiveTime(data) {
  return {
    type: TYPES.SET_ACTIVE_TIME,
    payload: data,
  };
}

export function SetActiveProcedureType(id) {
  return (dispatch) => {
    fetch(`${host}/ProcedureType/GetProcedureTypeById?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(SetActiveProcedureTypeSuccess(data));
      });
  };
}
export function SetActiveProcedureTypeSuccess(data) {
  return {
    type: TYPES.SET_ACTIVE_PROCEDURE_TYPE,
    payload: data,
  };
}

export function SetActiveProcedure(id) {
  return (dispatch) => {
    fetch(`${host}/Procedure/GetServiceById?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(SetActiveProcedureSuccess(data));
      });
  };
}
export function SetActiveProcedureSuccess(data) {
  return {
    type: TYPES.SET_ACTIVE_PROCEDURE,
    payload: data,
  };
}

export function SetActiveClient(id) {
  return (dispatch) => {
    fetch(`${host}/Client/GetClientById?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(SetActiveClientSuccess(data));
      });
  };
}
export function SetActiveClientSuccess(data) {
  return {
    type: TYPES.SET_ACTIVE_CLIENT,
    payload: data,
  };
}

export function SetActiveEmployee(id) {
  return (dispatch) => {
    fetch(`${host}/Employee/GetEmployeeViewModelById?id=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(SetActiveEmployeeSuccess(data));
      });
  };
}
export function SetActiveEmployeeSuccess(data) {
  return {
    type: TYPES.SET_ACTIVE_EMPLOYEE,
    payload: data,
  };
}

// Set booking status
export function SetBookingStatus() {
  return {
    type: TYPES.SET_BOOKING_STATUS,
  };
}
// Set client registration status
export function RedirectToOrdering() {
  return {
    type: TYPES.REDIRECT_TO_ORDERING,
  };
}
// Set order creation status (from main by client)
export function SetOrderStatus() {
  return {
    type: TYPES.SET_ORDER_CREATION_STATUS,
  };
}

export function ResetActiveSingleData() {
  return {
    type: TYPES.RESET_SINGLE_DATA,
  };
}

// Reset react-select single value (resetting of single select field value)
export function ResetSelectedValue() {
  return {
    type: TYPES.RESET_SINGLE_SELECTED_VALUE,
  };
}

// Reset react-select values (resetting of all values of selects)
export function ResetSelectedValues() {
  return {
    type: TYPES.RESET_SELECTED_VALUES,
  };
}

// Set react-select values (set each selected value to the state)
export function SetSelectedValue(inputName) {
  return {
    type: TYPES.SET_SELECTED_VALUE,
    payload: inputName,
  };
}

// ================Add order from main menu
export function AddOrder(dataObject) {
  var requestURL = 'https://localhost:7275/Order/CreateOrder';
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      headers: new Headers({
        Accept: 'application/json',
        'content-type': 'application/json',
      }),
      body: JSON.stringify(dataObject),
    })
      .then((response) => {
        if (response.status !== 200) {
          alert('Some of the optional fields are empty! Adding failed.');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
//========================================================
//========================================================
export function SetActiveMenu(activeMenu) {
  return {
    type: TYPES.SET_ACTIVE_MENU,
    payload: activeMenu,
  };
}

export function ResetActiveMenu() {
  return {
    type: TYPES.RESET_ACTIVE_MENU,
  };
}

export function SetActiveMediatype(type) {
  return {
    type: TYPES.SET_ACTIVE_MEDIA_TYPE,
    payload: type,
  };
}

export function GetImage(id) {
  var requestURL = `${host}/MediaFile/GetFileById?id=${id}`;

  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        dispatch(FetchActiveRecordDataSuccess(imageObjectURL));
      });
  };
}

//========================================================
//========================================================
// Get all feedback to display for the clients
export function GetAllApprovedFeedbacks(
  activeMenu,
  itemsPerPage = 12,
  pageNumber = 1,
) {
  var options = `?elementsPerPage=${itemsPerPage}&pageNumber=${pageNumber}`;
  const requestURL = `${host}/Feedback/GetAllApprovedFeedbacks${options}`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(FeetchMainTableDataSuccess(data, activeMenu));
      });
  };
}

// Profile photo uploading

export function UploadProfilePhoto(employeeId, profilePhoto) {
  var requestURL = `${host}/MediaFile/UploadProfilePhoto?employeeId=${employeeId}`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      body: profilePhoto,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .then(() => {
        dispatch(FeetchMainTableData('staffPage'));
        dispatch(GetProfilePhotoByEmployeeId(employeeId));
        dispatch(FetchActiveRecordData(employeeId, 'staffPage'));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

// Other photo uploading

export function UploadPhoto(employeeId, mediaType, mediafile) {
  alert(employeeId);
  var requestURL = `${host}/MediaFile/UploadMediaFile?employeeId=${employeeId}&type=${mediaType}`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      body: mediafile,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .then(() => {
        dispatch(FeetchMainTableData('mediaFilesPage'));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function GetProfilePhotoByEmployeeId(employeeId) {
  var requestURL = `${host}/MediaFile/GetProfilePhotoByEmployeeId?id=${employeeId}`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        dispatch(FeetchProfilePhotoSuccess(imageObjectURL));
      })
      .then((imageObjectURL) => {
        return imageObjectURL;
      });
  };
}

export function FeetchProfilePhotoSuccess(imageObjectURL) {
  return {
    type: TYPES.FETCH_PROFILE_PHOTO_SUCCESS,
    payload: imageObjectURL,
  };
}

export function UploadProcedureTypePhoto(procedureTypeId, procedureTypePhoto) {
  var requestURL = `${host}/MediaFile/UploadProcedureTypePhoto?procedureTypeId=${procedureTypeId}`;
  return (dispatch) => {
    fetch(requestURL, {
      method: 'POST',
      cors: 'no-cors',
      body: procedureTypePhoto,
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log('not ok' + response.status);
        }
      })
      .then(() => {
        dispatch(FeetchMainTableData('servicesPage'));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function GetProcedureTypePhotoById(procedureTypeId) {
  var requestURL = `${host}/MediaFile/GetProcedureTypePhotoById?id=${procedureTypeId}`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then((response) => response.blob())
      .then((imageBlob) => {
        const imageObjectURL = URL.createObjectURL(imageBlob);
        dispatch(FeetchProcedureTypePhotoSuccess(imageObjectURL));
      })
      .then((imageObjectURL) => {
        return imageObjectURL;
      });
  };
}

export function FeetchProcedureTypePhotoSuccess(imageObjectURL) {
  return {
    type: TYPES.FETCH_PROCEDURE_TYPE_PHOTO_SUCCESS,
    payload: imageObjectURL,
  };
}

// Check unwachedFeedbacks

export function CheckUnwachedFeedbacks() {
  var requestURL = `${host}/Feedback/CheckUnwachedFeedbacks`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(CheckUnwachedFeedbacksSuccess(data));
      });
  };
}

export function CheckUnwachedFeedbacksSuccess(data) {
  return {
    type: TYPES.SET_NEW_FEEDBACKS_STATE,
    payload: data,
  };
}

// Check unprocessed orders

export function CheckUnprocessedOrders() {
  var requestURL = `${host}/Order/CheckUnprocessedOrders`;
  return (dispatch) => {
    fetch(requestURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response;
      })
      .then(async (response) => {
        const data = await response.json();
        dispatch(CheckUnprocessedOrdersSuccess(data));
      });
  };
}

export function CheckUnprocessedOrdersSuccess(data) {
  return {
    type: TYPES.SET_NEW_ORDERS_STATE,
    payload: data,
  };
}
