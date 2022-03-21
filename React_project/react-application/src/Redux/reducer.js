import * as TYPES from './Actions/actionTypes.js';

const initialState = {
  openTime: 9,
  closeTime: 21,
  employeeToken: '',
  isAuthenticated: false,
  isEditing: false,
  createProcedureTypeModalOpen: false,
  updateProcedureTypeModalOpen: false,
  updateModalOpen: false,
  createModalOpen: false,
  loginModalOpen: false,
  pagedTablesData: '',
  singleResponseData: '',
  activeMenu: 'promotionsPage',
  activeId: 0,
  employeeProfilePhoto: '',
  procedureTypePhoto: '',
  sortBy: '',
  activeMediaType: '',
  isButtonEnable: 'disabled',

  // states for order creation
  procedures: '',
  employees: '',
  clients: '',
  schedule: '',
  activeProcedure: '',
  activeProcedureType: '',
  activeTime: '',
  activeDate: '',
  activeClient: '',
  activeEmployee: '',
  procedureInputStatus: true,

  // states of the react-select fields (order modals)
  procedureType: '',
  procedure: '',
  employee: '',
  orderTime: '',
  client: '',

  // states for order creation (by clients from main)
  newOrderCreationInProcess: false,
  bookingInProcess: false,

  // states for pagination in the tables
  pagesCount: '',
  pageNumber: 1,
  elementsPerPage: 12,

  // states for checking of new orders and feedbacks
  unwachedFeedbacks: false,
  uncalledClients: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.ACTIVE_ID_SET:
      return {
        ...state,
        activeId: action.payload,
      };

    case TYPES.FETCH_TABLE_DATA_SUCCESS:
      return {
        ...state,
        activeMenu: action.identifier,
        pagedTablesData: action.payload,
        sortBy: action.sortBy,
      };

    case TYPES.SINGLE_RECORD_FETCH_DATA_SUCCESS:
      return {
        ...state,
        singleResponseData: action.payload,
      };

    case TYPES.EMPLOYEE_AUTORIZATION_SUCCESS:
      return {
        ...state,
        employeeToken: action.payload,
        isAuthenticated: true,
        updateModalOpen: false,
      };

    case TYPES.RESET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: '',
      };

    case TYPES.RESET_SINGLE_DATA:
      return {
        ...state,
        singleResponseData: '',
      };

    case TYPES.EMPLOYEE_AUTHORIZATION_FAILED:
      return {
        ...state,
        employeeToken: '',
      };

    case TYPES.EMPLOYEE_LOGOUT:
      return {
        ...state,
        employeeToken: '',
        activeMenu: '',
        pagedTablesData: '',
        isAuthenticated: false,
      };

    case TYPES.UPDATE_MODAL_WINDOW_STATE:
      return {
        ...state,
        updateModalOpen: !state.updateModalOpen,
        procedures: '',
        employees: '',
        procedureInputStatus: true,
      };

    case TYPES.CREATE_MODAL_WINDOW_STATE:
      return {
        ...state,
        createModalOpen: !state.createModalOpen,
        procedures: '',
        employees: '',
        procedureInputStatus: true,
      };

    case TYPES.LOGIN_MODAL_WINDOW_STATE:
      return {
        ...state,
        loginModalOpen: !state.loginModalOpen,
        procedures: '',
        employees: '',
        procedureInputStatus: true,
      };

    case TYPES.UPDATE_PROCEDURE_TYPE_MODAL_WINDOW_STATE:
      return {
        ...state,
        updateProcedureTypeModalOpen: !state.updateProcedureTypeModalOpen,
      };

    case TYPES.CREATE_PROCEDURE_TYPE_MODAL_WINDOW_STATE:
      return {
        ...state,
        createProcedureTypeModalOpen: !state.createProcedureTypeModalOpen,
      };

    case TYPES.EDIT_STATE:
      return {
        ...state,
        isEditing: !state.isEditing,
      };

    case TYPES.PROCEDURE_FETCH_DATA_SUCCESS:
      return {
        ...state,
        procedures: action.payload,
        procedureInputStatus: false,
      };

    case TYPES.EMPLOYEE_FETCH_DATA_SUCCESS:
      return {
        ...state,
        employees: action.payload,
      };

    case TYPES.SCHEDULE_FETCH_DATA_SUCCESS:
      return {
        ...state,
        schedule: action.payload,
      };

    case TYPES.SET_ACTIVE_DATE:
      return {
        ...state,
        activeDate: action.payload,
      };

    case TYPES.SET_ACTIVE_TIME:
      return {
        ...state,
        activeTime: action.payload,
      };

    case TYPES.SET_ACTIVE_PROCEDURE:
      return {
        ...state,
        activeProcedure: action.payload,
      };

    case TYPES.SET_ACTIVE_EMPLOYEE:
      return {
        ...state,
        activeEmployee: action.payload,
      };

    case TYPES.SET_ACTIVE_PROCEDURE_TYPE:
      return {
        ...state,
        activeProcedureType: action.payload,
      };

    case TYPES.SET_ACTIVE_CLIENT:
      return {
        ...state,
        activeClient: action.payload,
        client: action.payload.firstName + ' ' + action.payload.lastName,
      };

    case TYPES.RESET_SELECTED_VALUES:
      let isDisabled = true;
      if (state.procedureInputStatus === false) isDisabled = true;
      return {
        ...state,
        procedureType: '',
        procedure: '',
        employee: '',
        orderTime: '',
        schedule: '',
        procedureInputStatus: isDisabled,
      };

    case TYPES.SET_SELECTED_VALUE:
      switch (action.payload) {
        case 'orderTime':
          return {
            ...state,
            orderTime: undefined,
          };

        case 'orderEmployee':
          return {
            ...state,
            schedule: '',
            employee: undefined,
            orderTime: '',
          };
        case 'orderProcedure':
          return {
            ...state,
            procedure: undefined,
            orderTime: '',
            employee: '',
          };
        case 'orderProcedureType':
          return {
            ...state,
            procedureType: undefined,
            procedure: '',
            employee: '',
            orderTime: '',
          };

        default:
          return state;
      }
    default:
      return state;

    case TYPES.SET_BOOKING_STATUS:
      return {
        ...state,
        bookingInProcess: !state.bookingInProcess,
      };

    case TYPES.REDIRECT_TO_ORDERING:
      return {
        ...state,
        singleResponseData: '',
      };

    case TYPES.SET_ORDER_CREATION_STATUS:
      return {
        ...state,
        bookingInProcess: !state.bookingInProcess,
        singleResponseData: '',
        pagedTablesData: '',
        activeMenu: '',
      };

    case TYPES.FETCH_PROFILE_PHOTO_SUCCESS:
      return {
        ...state,
        employeeProfilePhoto: action.payload,
      };

    case TYPES.FETCH_PROCEDURE_TYPE_PHOTO_SUCCESS:
      return {
        ...state,
        procedureTypePhoto: action.payload,
      };

    case TYPES.SET_ACTIVE_MEDIA_TYPE:
      return {
        ...state,
        activeMediaType: action.payload,
      };

    case TYPES.SET_ACTIVE_MENU:
      return {
        ...state,
        activeMenu: action.payload,
      };

    case TYPES.SET_NEW_FEEDBACKS_STATE:
      return {
        ...state,
        unwachedFeedbacks: action.payload,
      };

    case TYPES.SET_NEW_ORDERS_STATE:
      return {
        ...state,
        uncalledClients: action.payload,
      };
  }
}
