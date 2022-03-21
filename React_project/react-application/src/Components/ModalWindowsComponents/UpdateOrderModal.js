import React from 'react';
import { connect } from 'react-redux';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import * as actions from '../../Redux/Actions/actions.js';
import Select from 'react-select';
import { DateFormat } from '../../Functions/DateFormat.js';

class UpdateOrderModal extends React.PureComponent {
  render() {
    var data = this.props.pagedTablesData;
    var singleData = this.props.singleResponseData;
    var orderInfoArea;
    var actionButtons;
    var minDate = DateFormat(Date());
    var currentDate = new Date();
    var maxDate = DateFormat(
      new Date(currentDate.setDate(currentDate.getDate() + 30)),
    );
    var orderToUpdate = '';
    var clientName = '';
    var employeeName = '';
    var procedure = '';
    var updatingClient = '';
    var orderDate = Date();
    var orderTime = Date();
    if (singleData !== '') {
      if (this.props.activeDate !== '') {
        orderTime = this.props.activeTime;
        orderDate = String(this.props.activeDate);
        orderDate = orderDate.substring(0, 10);
      } else {
        orderTime = singleData.dateOfService;
        orderDate = String(singleData.dateOfService);
        orderDate = orderDate.substring(0, 10);
      }
      if (this.props.activeClient !== '') {
        updatingClient = this.props.activeClient;
      } else {
        updatingClient = singleData.client;
      }
      orderToUpdate = {
        orderId: this.props.activeId,
        dateOfService: orderTime,
        client: updatingClient,
        procedure: this.props.activeProcedure,
        employee: this.props.activeEmployee,
      };
      clientName =
        singleData.client.firstName + ' ' + singleData.client.lastName;
      employeeName =
        singleData.employee.firstName + ' ' + singleData.employee.lastName;
      procedure = singleData.procedure.procedureName;
      orderDate = singleData.dateOfService.substr(0, 10);
      orderTime = singleData.dateOfService.substr(11, 5);
    }

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

    if (!this.props.isEditing) {
      actionButtons = (
        <div className="editUserInfo">
          <button className="modalButton" onClick={this.props.onEdit}>
            Edit order
          </button>
          <button
            className="modalButton"
            onClick={() => {
              this.props.onDelete(this.props.activeId, this.props.activeMenu);
              this.props.setUpdateModalState();
            }}
          >
            Delete order
          </button>
        </div>
      );

      orderInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <p>Date of service: {orderDate}</p>
          </div>

          <div className="profileTextItem">
            <p>Client name: {clientName}</p>
          </div>

          <div className="profileTextItem">
            <p>
              Procedure:
              {procedure}
            </p>
          </div>

          <div className="profileTextItem">
            <p>Employee: {employeeName}</p>
          </div>

          <div className="profileTextItem">
            <p>Time of service: {orderTime} </p>
          </div>
        </div>
      );
    } else {
      actionButtons = (
        <div className="confirmUserInfo">
          <div>
            <button
              className="modalButton"
              onClick={() => {
                this.props.onEdit();
                this.props.setUpdateModalState();
                this.props.onUpdate(this.props.activeMenu, orderToUpdate);
              }}
            >
              Save changes
            </button>
          </div>
        </div>
      );

      orderInfoArea = (
        <div className="profileText">
          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Date of service:</p>
            </div>
            <div className="profileTextItem-right">
              <input
                type="date"
                min={minDate}
                max={maxDate}
                defaultValue={orderDate}
                onChange={(e) => {
                  this.props.setOrdersDate(e.target.value);
                  orderToUpdate.dateOfService = this.props.activeDate;
                  this.props.resetSelected();
                }}
              />
            </div>
          </div>

          <div className="profileTextItem">
            <div className="profileTextItem-left">
              <p>Client name:</p>
            </div>
            <div className="profileTextItem-right" placeholder={clientName}>
              <Select
                maxMenuHeight={100}
                options={clientList}
                defaultInputValue={clientName}
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
            <div className="profileTextItem-right" placeholder={procedure}>
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
            <div className="profileTextItem-right" placeholder={employeeName}>
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
            <div className="profileTextItem-left" placeholder={orderTime}>
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
        </div>
      );
    }

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
        open={this.props.updateModalOpen}
        center={true}
        showCloseIcon={false}
        onOverlayClick={this.props.setUpdateModalState}
      >
        <>
          <p className="title">Order menu</p>
          <div className="profileBody">{orderInfoArea}</div>
          {actionButtons}
        </>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateModalOpen: state.updateModalOpen,
    pagedTablesData: state.pagedTablesData,
    singleResponseData: state.singleResponseData,
    isEditing: state.isEditing,
    activeId: state.activeId,
    activeMenu: state.activeMenu,
    schedule: state.schedule,

    // Working time of salon
    openTime: state.openTime,
    closeTime: state.closeTime,
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
    setUpdateModalState: () => dispatch(actions.SetUpdateModalState()),
    onEdit: () => dispatch(actions.SetEditModalState()),
    onDelete: (id, menu) => {
      dispatch(actions.DeleteData(id, menu));
    },
    onUpdate: (activeMenu, data) =>
      dispatch(actions.UpdateData(activeMenu, data)),
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderModal);
