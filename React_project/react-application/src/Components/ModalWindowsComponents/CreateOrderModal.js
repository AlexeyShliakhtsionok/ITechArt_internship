import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';
import { DateFormat } from '../../Functions/DateFormat.js';

class CreateOrderModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var orderInfoArea;
    var actionButtons;
    var minDate = DateFormat(Date());
    var currentDate = new Date();
    var maxDate = DateFormat(
      new Date(currentDate.setDate(currentDate.getDate() + 30)),
    );
    var orderToCreate = {
      dateOfService: this.props.activeTime,
      client: this.props.activeClient,
      procedure: this.props.activeProcedure,
      employee: this.props.activeEmployee,
      isCompleted: false,
    };

    var clientList = [];
    var procedureTypesList = [];
    var procedureList = [];
    var employeeList = [];

    data.clientsSelectList.forEach((element) => {
      clientList.push({
        value: element.value,
        label: element.text,
      });
    });
    data.procedureTypesSelectList.forEach((element) => {
      procedureTypesList.push({
        value: element.value,
        label: element.text,
      });
    });

    if (this.props.procedures !== '') {
      this.props.procedures.forEach((element) => {
        procedureList.push({
          value: element.procedureId,
          label: element.procedureName,
        });
      });
    }

    if (this.props.employees !== '') {
      this.props.employees.forEach((element) => {
        employeeList.push({
          value: element.employeeId,
          label: element.firstName + ' ' + element.lastName,
        });
      });
    }

    var scheduleTimesList = [];
    if (this.props.schedule !== '') {
      this.props.schedule.forEach((time) => {
        scheduleTimesList.push({
          value: time,
          label: time.substr(11),
        });
      });
    }

    orderInfoArea = (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            (this.props.activeTime ||
              this.props.activeClient ||
              this.props.activeProcedure ||
              this.props.activeEmployee) === ''
          ) {
            alert('Some of required fields is empty. Adding failed...');
          } else {
            this.props.setCreateModalState();
            this.props.onCreate(this.props.activeMenu, orderToCreate);
          }
        }}
        className="profileText"
      >
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Date of service:</p>
          </div>
          <div className="profileTextItem-right">
            <input
              required
              type="date"
              min={minDate}
              max={maxDate}
              placeholder="Date..."
              onChange={(e) => {
                this.props.setOrdersDate(e.target.value);
                this.props.resetSelected();
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>ClientName:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              maxMenuHeight={100}
              options={clientList}
              onChange={(data) => {
                this.props.setOrdersClient(data.value);
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure type:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              value={this.props.procedureType}
              maxMenuHeight={100}
              options={procedureTypesList}
              onChange={(data) => {
                this.props.setSelectedValue('orderProcedureType');
                this.props.getProcedures(data.value);
                this.props.getEmployees(data.value);
              }}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Procedure:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              value={this.props.procedure}
              isDisabled={this.props.procedureInputStatus}
              maxMenuHeight={100}
              onChange={(data) => {
                this.props.setSelectedValue('orderProcedure');
                this.props.setOrdersProcedure(data.value);
              }}
              options={procedureList}
            />
          </div>
        </div>
        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Employee:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              value={this.props.employee}
              isDisabled={this.props.procedureInputStatus}
              maxMenuHeight={100}
              onChange={(data) => {
                this.props.setSelectedValue('orderEmployee');
                this.props.setOrdersEmployee(data.value);
                this.props.getSchedule(
                  data.value,
                  this.props.activeDate,
                  this.props.activeProcedure.procedureId,
                  this.props.openTime,
                  this.props.closeTime,
                );
              }}
              options={employeeList}
            />
          </div>
        </div>

        <div className="profileTextItem">
          <div className="profileTextItem-left">
            <p>Time of service:</p>
          </div>
          <div className="profileTextItem-right">
            <Select
              value={this.props.orderTime}
              hideSelectedOptions={true}
              isDisabled={this.props.procedureInputStatus}
              maxMenuHeight={100}
              onChange={(data) => {
                this.props.setSelectedValue('orderTime');
                this.props.setOrdersTime(data.value);
              }}
              options={scheduleTimesList}
            />
          </div>
        </div>
        <div className="confirmUserInfo">
          <div>
            <input type="submit" className="modalButton" value="Create" />
          </div>
        </div>
      </form>
    );

    return (
      <Modal
        styles={{
          modal: {
            maxWidth: 'fit-content',
            background: '#6c3636',
            padding: '40px',
            fontFamily: 'Play',
            alignItems: 'center',
            textAlign: 'center',
            border: '6px solid #f7f6f6',
            borderRadius: '10px',
          },
        }}
        open={this.props.createModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setCreateModalState}
      >
        <>
          <p className="title">Create new order</p>
          <div className="profileBody">{orderInfoArea}</div>
          {actionButtons}
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    // Working time of salon
    openTime: state.openTime,
    closeTime: state.closeTime,
    // Modal window open/close states
    createModalOpen: state.createModalOpen,
    // Get all data
    pagedTablesData: state.pagedTablesData,
    activeMenu: state.activeMenu,
    // Get single data (unneccessary here???)
    singleResponseData: state.singleResponseData,
    activeId: state.activeId,

    // For order creation
    client: state.client,
    orderTime: state.orderTime,
    procedure: state.procedure,
    procedureType: state.procedureType,
    employee: state.employee,

    //-----All procedures of certain procedure type
    procedures: state.procedures,

    //-----All employees of certain procedure type
    employees: state.employees,

    // Flag for enabling some of inputs
    procedureInputStatus: state.procedureInputStatus,

    // Time-schedule of employee for certain day with taking into account the time for the execution of procedures
    schedule: state.schedule,

    // active orders objects
    activeProcedure: state.activeProcedure,
    activeDate: state.activeDate,
    activeTime: state.activeTime,
    activeClient: state.activeClient,
    activeEmployee: state.activeEmployee,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setCreateModalState: () => dispatch(actions.SetCreateModalState()),
    onCreate: (activeMenu, data) => dispatch(actions.AddData(activeMenu, data)),
    getProcedures: (typeId) => dispatch(actions.GetProceduresByType(typeId)),
    getEmployees: (typeId) =>
      dispatch(actions.GetEmployeesByProcedureType(typeId)),
    getSchedule: (employeeId, dateOfService, procedureId, open, close) =>
      dispatch(
        actions.GetAvaliableTimes(
          employeeId,
          dateOfService,
          procedureId,
          open,
          close,
        ),
      ),
    setOrdersDate: (date) => dispatch(actions.SetActiveDate(date)),
    setOrdersTime: (date) => dispatch(actions.SetActiveTime(date)),
    setOrdersProcedure: (data) => dispatch(actions.SetActiveProcedure(data)),
    setOrdersClient: (data) => dispatch(actions.SetActiveClient(data)),
    setOrdersEmployee: (data) => dispatch(actions.SetActiveEmployee(data)),
    resetSelected: () => dispatch(actions.ResetSelectedValues()),
    setSelectedValue: (inputName) =>
      dispatch(actions.SetSelectedValue(inputName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrderModal);
