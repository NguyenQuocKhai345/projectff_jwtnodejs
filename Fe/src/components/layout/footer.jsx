// import React from 'react';
// import { Layout, Row, Col } from 'antd';
// import { FacebookOutlined, GithubOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

// const { Footer } = Layout;

// const AppFooter = () => {
//     return (
//         <Footer style={{ backgroundColor: '#001529', color: '#ffffff', padding: '40px 20px' }}>
//             <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
//                 <Row gutter={[32, 32]}>
//                     {/* Cột 1: Giới thiệu dịch vụ */}
//                     <Col xs={24} sm={12} md={8}>
//                         <h3 style={{ color: '#fff', borderBottom: '2px solid #1890ff', display: 'inline-block', marginBottom: '20px' }}>
//                             VỀ CHÚNG TÔI
//                         </h3>
//                         <p style={{ color: '#a6adb4', lineHeight: '1.8' }}>
//                             Chúng tôi cung cấp giải pháp quản lý y tế thông minh,
//                             giúp kết nối bệnh nhân và bác sĩ một cách nhanh chóng và hiệu quả.
//                             Hệ thống bảo mật, an toàn và dễ sử dụng.
//                         </p>
//                     </Col>

//                     {/* Cột 2: Liên kết nhanh */}
//                     <Col xs={24} sm={12} md={8}>
//                         <h3 style={{ color: '#fff', borderBottom: '2px solid #1890ff', display: 'inline-block', marginBottom: '20px' }}>
//                             DỊCH VỤ
//                         </h3>
//                         <ul style={{ listStyle: 'none', padding: 0, color: '#a6adb4' }}>
//                             <li style={{ marginBottom: '10px' }}>• Đặt lịch khám trực tuyến</li>
//                             <li style={{ marginBottom: '10px' }}>• Quản lý hồ sơ bệnh án</li>
//                             <li style={{ marginBottom: '10px' }}>• Tư vấn sức khỏe 24/7</li>
//                             <li style={{ marginBottom: '10px' }}>• Tra cứu kết quả xét nghiệm</li>
//                         </ul>
//                     </Col>

//                     {/* Cột 3: Liên hệ */}
//                     <Col xs={24} sm={12} md={8}>
//                         <h3 style={{ color: '#fff', borderBottom: '2px solid #1890ff', display: 'inline-block', marginBottom: '20px' }}>
//                             LIÊN HỆ
//                         </h3>
//                         <p style={{ color: '#a6adb4' }}><MailOutlined /> Email: khai03042005@gmail.com</p>
//                         <p style={{ color: '#a6adb4' }}><PhoneOutlined /> Hotline: 0396570305</p>
//                         <div style={{ fontSize: '24px', marginTop: '20px' }}>
//                             <a href="https://www.facebook.com/nguyen.khai.97551?locale=vi_VN" target="_blank" rel="noopener noreferrer">
//                                 <FacebookOutlined style={{ marginRight: '15px', cursor: 'pointer' }} />
//                             </a>
//                             <a href="https://github.com/NguyenQuocKhai345/projectff_jwtnodejs" target="_blank" rel="noopener noreferrer">
//                                 <GithubOutlined style={{ marginRight: '15px', cursor: 'pointer' }} />
//                             </a>
//                         </div>
//                     </Col>
//                 </Row>

//                 <div style={{ textAlign: 'center', marginTop: '40px', borderTop: '1px solid #303030', paddingTop: '20px', color: '#595959' }}>
//                     ©{new Date().getFullYear()} Created by Your Project Team
//                 </div>
//             </div>
//         </Footer>
//     );
// };

// export default AppFooter;




import React from 'react';
import { Layout, Row, Col } from 'antd';
import { FacebookOutlined, GithubOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';

const { Footer } = Layout;

const AppFooter = () => {
    return (
        <Footer style={{
            backgroundColor: '#001529',
            color: '#ffffff',
            padding: '40px 20px',
            borderTop: '3px solid #1890ff'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <Row gutter={[32, 32]}>
                    {/* Cột 1 */}
                    <Col xs={24} sm={12} md={8}>
                        <h3 style={{
                            color: '#fff',
                            borderBottom: '2px solid #1890ff',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            VỀ CHÚNG TÔI
                        </h3>
                        <p style={{ color: '#a6adb4', lineHeight: '1.8' }}>
                            Chúng tôi cung cấp giải pháp quản lý y tế thông minh,
                            giúp kết nối bệnh nhân và bác sĩ một cách nhanh chóng và hiệu quả.
                            Hệ thống bảo mật, an toàn và dễ sử dụng.
                        </p>
                    </Col>

                    {/* Cột 2 */}
                    <Col xs={24} sm={12} md={8}>
                        <h3 style={{
                            color: '#fff',
                            borderBottom: '2px solid #1890ff',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            DỊCH VỤ
                        </h3>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#a6adb4' }}>
                            <li style={{ marginBottom: '10px' }}>• Đặt lịch khám trực tuyến</li>
                            <li style={{ marginBottom: '10px' }}>• Quản lý hồ sơ bệnh án</li>
                            <li style={{ marginBottom: '10px' }}>• Tư vấn sức khỏe 24/7</li>
                            <li style={{ marginBottom: '10px' }}>• Tra cứu kết quả xét nghiệm</li>
                        </ul>
                    </Col>

                    {/* Cột 3 */}
                    <Col xs={24} sm={12} md={8}>
                        <h3 style={{
                            color: '#fff',
                            borderBottom: '2px solid #1890ff',
                            display: 'inline-block',
                            marginBottom: '20px'
                        }}>
                            LIÊN HỆ
                        </h3>
                        <p style={{ color: '#a6adb4' }}>
                            <MailOutlined /> Email: khai03042005@gmail.com
                        </p>
                        <p style={{ color: '#a6adb4' }}>
                            <PhoneOutlined /> Hotline: 0396570305
                        </p>

                        <div style={{ fontSize: '24px', marginTop: '20px' }}>
                            <a href="https://www.facebook.com/nguyen.khai.97551?locale=vi_VN" target="_blank" rel="noopener noreferrer">
                                <FacebookOutlined
                                    style={{ marginRight: '15px', cursor: 'pointer' }}
                                />
                            </a>
                            <a href="https://github.com/NguyenQuocKhai345/projectff_jwtnodejs" target="_blank" rel="noopener noreferrer">
                                <GithubOutlined
                                    style={{ marginRight: '15px', cursor: 'pointer' }}
                                />
                            </a>
                        </div>
                    </Col>
                </Row>

                <div style={{
                    textAlign: 'center',
                    marginTop: '40px',
                    borderTop: '1px solid #303030',
                    paddingTop: '20px',
                    color: '#595959'
                }}>
                    ©{new Date().getFullYear()} Created by Khai
                </div>
            </div>
        </Footer>
    );
};

export default AppFooter;
