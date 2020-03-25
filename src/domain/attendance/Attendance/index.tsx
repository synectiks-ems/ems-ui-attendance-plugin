import * as React from 'react';
import * as moment from 'moment';
import { withApollo } from 'react-apollo';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
// import AttendanceOverview from './AttendanceOverview';
import TeacherAttendance from './TeacherAttendance';
import MarkAttendance from './MarkAttendance';
import { TEACHER_ATTENDANCE_CACHE, ADMIN_ATTENDANCE_CACHE } from '../_queries';
import wsCmsBackendServiceSingletonClient from '../../../wsCmsBackendServiceClient';

export interface AttendanceProps extends React.HTMLAttributes<HTMLElement>{
    [data: string]: any;
    user?: any,
    permissions?: any;
}

class Attendance extends React.Component<AttendanceProps, any> {
    LOGGED_IN_USER = new URLSearchParams(location.search).get('signedInUser');
    constructor(props: AttendanceProps) {
        super(props);
        this.state = {
            permissions: this.props.permissions,
            activeTab: 0,
            user: this.props.user,
            attendanceCacheForTeacher: null,
            attendanceCacheForAdmin: null,
            branchId: null,
            academicYearId: null,
            departmentId: null,
            teacherId: null,
        };
        this.toggleTab = this.toggleTab.bind(this);
        this.registerSocket = this.registerSocket.bind(this);
        this.getAttendanceCacheForAdmin = this.getAttendanceCacheForAdmin.bind(this);
        this.getAttendanceCacheForTeacher = this.getAttendanceCacheForTeacher.bind(this);
    }

    async componentDidMount(){
        await this.registerSocket();
        await this.getAttendanceCacheForTeacher();
        await this.getAttendanceCacheForAdmin();
    }

    registerSocket() {
        const socket = wsCmsBackendServiceSingletonClient.getInstance();

        socket.onmessage = (response: any) => {
            let message = JSON.parse(response.data);
            console.log("Attendance index. message received from server ::: ", message);
            this.setState({
                branchId: message.selectedBranchId,
                academicYearId: message.selectedAcademicYearId,
                departmentId: message.selectedDepartmentId,
                teacherId: message.userId,
            });
            console.log("Attendance index. branchId: ",this.state.branchId);
            console.log("Attendance index. departmentId: ",this.state.departmentId);
            console.log("Attendance index. ayId: ",this.state.academicYearId);  
        }
    
        socket.onopen = () => {
           console.log("Attendance index. Opening websocekt connection on index.tsx. User : ",new URLSearchParams(location.search).get("signedInUser"));
           socket.send(new URLSearchParams(location.search).get("signedInUser"));
        }
    
        window.onbeforeunload = () => {
            console.log("Attendance index. Closing websocekt connection on index.tsx");
        }
    }

    async toggleTab(tabNo: any) {
        this.setState({
            activeTab: tabNo,
        });

        if(tabNo === 0){
            this.getAttendanceCacheForTeacher();
        }

        if(tabNo === 1){
            this.getAttendanceCacheForAdmin();
        }

    }

    async getAttendanceCacheForTeacher() {
        const {branchId, academicYearId, teacherId} = this.state;
        const {data} = await this.props.client.query({
          query: TEACHER_ATTENDANCE_CACHE,
            variables: {
                branchId: branchId,
                academicYearId: academicYearId,
                lectureDate: moment(new Date()).format("DD-MM-YYYY"),
                teacherId: teacherId
            },
          
          fetchPolicy: 'no-cache',
        });
        this.setState({
          attendanceCacheForTeacher: data,
        });
    }

    async getAttendanceCacheForAdmin() {
        const {branchId, academicYearId, departmentId} = this.state;
        const {data} = await this.props.client.query({
          query: ADMIN_ATTENDANCE_CACHE,
            variables: {
                branchId: branchId,
                departmentId: departmentId,
                academicYearId: academicYearId,
            },
          
          fetchPolicy: 'no-cache',
        });
        this.setState({
            attendanceCacheForAdmin: data,
        });
    }

    render() {
        const { activeTab, permissions, attendanceCacheForTeacher, attendanceCacheForAdmin } = this.state;
        return (
            <section className="tab-container row vertical-tab-container">
                <Nav tabs className="pl-3 pl-3 mb-4 mt-4 col-sm-2">
                    
                    {
                        this.LOGGED_IN_USER !== 'admin' && permissions["Teacher Attendance"] === "Teacher Attendance" ?
                            <NavItem className="cursor-pointer">
                                <NavLink className={`vertical-nav-link ${activeTab === 0? 'side-active' : ''}`} onClick={() => { this.toggleTab(0); }} >
                                    Teacher Attendance
                                </NavLink>
                            </NavItem>
                        : this.LOGGED_IN_USER === 'admin' ?
                            <NavItem className="cursor-pointer">
                                <NavLink className={`vertical-nav-link ${activeTab === 0? 'side-active' : ''}`} onClick={() => { this.toggleTab(0); }} >
                                    Teacher Attendance
                                </NavLink>
                            </NavItem>
                        : null
                    }    

                    
                     {
                        this.LOGGED_IN_USER !== 'admin' && permissions["Admin Attendance"] === "Admin Attendance" ?
                            <NavItem className="cursor-pointer">
                                <NavLink className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(1); }} >
                                Admin Attendance
                                </NavLink>
                            </NavItem>
                        : this.LOGGED_IN_USER === 'admin' ?
                            <NavItem className="cursor-pointer">
                                <NavLink className={`vertical-nav-link ${activeTab === 1 ? 'side-active' : ''}`} onClick={() => { this.toggleTab(1); }} >
                                Admin Attendance
                                </NavLink>
                            </NavItem>
                        : null
                    }
                </Nav>
                <TabContent activeTab={activeTab} className="col-sm-9 border-left p-t-1">
                    
                    {
                        this.LOGGED_IN_USER !== 'admin' && permissions["Teacher Attendance"] === "Teacher Attendance" ?
                            <TabPane tabId={0}>
                                {
                                    attendanceCacheForTeacher !== null && (
                                        <TeacherAttendance attendanceCacheForTeacher={attendanceCacheForTeacher.createStudentAttendanceCache}></TeacherAttendance>
                                    )
                                } 
                            </TabPane>
                        : this.LOGGED_IN_USER === 'admin' ?
                            <TabPane tabId={0}>
                                {
                                    attendanceCacheForTeacher !== null && (
                                        <TeacherAttendance attendanceCacheForTeacher={attendanceCacheForTeacher.createStudentAttendanceCache}></TeacherAttendance>
                                    )
                                } 
                            </TabPane>
                        : null
                    }
                    
                    {
                        this.LOGGED_IN_USER !== 'admin' && permissions["Admin Attendance"] === "Admin Attendance" ?
                            <TabPane tabId={1}>
                                {
                                    attendanceCacheForAdmin !== null && (
                                        <MarkAttendance attendanceCacheForAdmin={attendanceCacheForAdmin.createStudentAttendanceCacheForAdmin}></MarkAttendance>
                                    )
                                }
                            </TabPane>
                        : this.LOGGED_IN_USER === 'admin' ?
                            <TabPane tabId={1}>
                                {
                                    attendanceCacheForAdmin !== null && (
                                        <MarkAttendance attendanceCacheForAdmin={attendanceCacheForAdmin.createStudentAttendanceCacheForAdmin}></MarkAttendance>
                                    )
                                }
                            </TabPane>
                        : null
                    }
                    
                </TabContent>
            </section>
        );
    }
}

export default withApollo(Attendance)