import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

interface type {
  checked: boolean;
}

class DatePickerComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      startDate: moment(),
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date: any) {
    this.setState({
      startDate: date,
    });
  }

  render() {
    return <DatePicker selected={this.state.startDate} onChange={this.handleChange} />;
  }
}

const TeacherMarkAttendance = () => (
  <section className="plugin-bg-white">
    <h3 className="bg-heading p-1">
      <i className="fa fa-university stroke-transparent mr-1" aria-hidden="true" />{' '}
      Teacher - Teacher Attendance
    </h3>
    <div className="p-1">
      <div className="dgrid-6">
        <div className="markWidth">
          <label>Stream</label>
          <select disabled>
            <option value="Computer Science">Computer Science</option>
            <option value="">Information Technology</option>
            <option value="">Electrical</option>
          </select>
        </div>
        <div className="markWidth">
          <label>Semester</label>
          <select disabled>
            <option value="Sem - 1">Sem - 1</option>
            <option value="">Sem - 2</option>
          </select>
        </div>
        <div className="markWidth">
          <label>Section</label>
          <select disabled>
            <option value="Div - 1">Div - 1</option>
            <option value="">Div - 2</option>
          </select>
        </div>
        <div className="markWidth">
          <label>Period</label>
          <select disabled>
            <option value="Period - 1">Period - 1</option>
            <option value="">Period - 2</option>
          </select>
        </div>
        <div className="markWidth">
          <label>Subject</label>
          <select disabled>
            <option value="Subject 1">Subject 1</option>
            <option value="">Subject 2</option>
          </select>
        </div>
      </div>

      <div className="tflex bg-heading mt-3">
        <h4 className="p-1 py-2 mb-0">Mark Attendance</h4>
        <div className="hhflex">
          <div>
            <select className="ma-select">
              <option value="">No Of Entries</option>
              <option value="">10</option>
              <option value="">20</option>
            </select>
          </div>
          <div className="mx-2">
            <select className="ma-select">
              <option value="">Sort By</option>
              <option value="">Name</option>
              <option value="">Roll No</option>
            </select>
          </div>
          <div className="h-center ma-select">
            <input type="text" placeholder="Search Student" className="ma-select" />
            <i className="fa fa-search" aria-hidden="true" />
          </div>
        </div>
      </div>
      <table className="fwidth" id="matable">
        <thead>
          <th>Student Id</th>
          <th>Student Name</th>
          <th>Today</th>
          <th>18\11\2018</th>
          <th>17\11\2018</th>
          <th>16\11\2018</th>
          <th>Comments</th>
        </thead>
        <tbody>
          <tr>
            <td>003</td>
            <td>James Carter</td>
            <td>
              <label className="switch">
                {' '}
                <input type="checkbox" defaultChecked /> <span className="slider" />{' '}
              </label>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square-red">
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <input type="text" placeholder="Enter your comment" />
            </td>
          </tr>
          <tr>
            <td>003</td>
            <td>James Carter</td>
            <td>
              <label className="switch">
                {' '}
                <input type="checkbox" defaultChecked /> <span className="slider" />{' '}
              </label>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square-red">
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <input type="text" placeholder="Enter your comment" />
            </td>
          </tr>
          <tr>
            <td>003</td>
            <td>James Carter</td>
            <td>
              <label className="switch">
                {' '}
                <input type="checkbox" defaultChecked /> <span className="slider" />{' '}
              </label>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square-red">
                <i className="fa fa-times" aria-hidden="true" />
              </span>
            </td>
            <td>
              <span className="check-square">
                <i className="fa fa-check" aria-hidden="true" />
              </span>
            </td>
            <td>
              <input type="text" placeholder="Enter your comment" />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="d-flex fwidth justify-content-between pt-2">
        <p>Showing 1-10 of 60 Entries</p>
        <div>
          <a href="" className="btn btn-primary mr-1">
            Save
          </a>
          <ul className="ul-attend">
            <li>
              <a href="" className="btn btn-primary w-btn blr">
                <i className="fa fa-arrow-left" aria-hidden="true" />
              </a>
            </li>
            <li>
              {' '}
              <a href="" className="btn btn-primary w-btn">
                1
              </a>
            </li>
            <li>
              <a href="" className="btn btn-primary w-btn pr-4">
                2
              </a>
            </li>
            <li>
              <a href="" className="btn btn-primary w-btn pr-4">
                3
              </a>
            </li>
            <li>
              <a href="" className="btn btn-primary w-btn btr">
                <i className="fa fa-arrow-right" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default TeacherMarkAttendance;
