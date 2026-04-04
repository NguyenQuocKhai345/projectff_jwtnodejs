// import React from 'react';
// import { Carousel } from 'antd';
// import image1 from '../assets/images/1.jpg';
// import image2 from '../assets/images/2.jpg';
// import image3 from '../assets/images/3.jpg';

// const HomePage = () => {
//     const contentStyle = {
//         height: '550px',
//         color: '#fff',
//         textAlign: 'center',
//         background: '#364d79',
//     };

//     const imgStyle = {
//         width: '100%',
//         height: '550px',
//         objectFit: 'cover'
//     };

//     return (
//         <div style={{ width: '100%' }}>
//             <Carousel autoplay effect="fade">
//                 <div>
//                     <div style={contentStyle}>
//                         <img src={image1} alt="Slide 1" style={imgStyle} />
//                     </div>
//                 </div>
//                 <div>
//                     <div style={contentStyle}>
//                         <img src={image2} alt="Slide 2" style={imgStyle} />
//                     </div>
//                 </div>
//                 <div>
//                     <div style={contentStyle}>
//                         <img src={image3} alt="Slide 3" style={imgStyle} />
//                     </div>
//                 </div>
//             </Carousel>

//             {/* Các nội dung khác của trang Home nếu có */}
//             <div style={{ padding: '50px 20px', textAlign: 'center', maxWidth: '1200px', margin: '0 auto' }}>
//                 <h1 style={{ fontSize: '32px' }}>Chăm sóc sức khỏe tận tâm</h1>
//                 <p style={{ fontSize: '18px', color: '#666' }}>Chúng tôi luôn đồng hành cùng bạn trên mọi nẻo đường.</p>
//             </div>
//         </div>
//     );
// };

// export default HomePage;




import React from 'react';
import { Carousel, Row, Col, Card } from 'antd';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';

const HomePage = () => {

    const imgStyle = {
        width: '100%',
        height: '550px',
        objectFit: 'cover',
        filter: 'brightness(70%)'
    };

    const overlayStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#fff',
        textAlign: 'center'
    };

    return (
        <div style={{ width: '100%' }}>

            {/* 🔥 HERO SLIDER */}
            <Carousel autoplay effect="fade">
                {[image1, image2, image3].map((img, index) => (
                    <div key={index}>
                        <div style={{ position: 'relative' }}>
                            <img src={img} alt={`Slide ${index}`} style={imgStyle} />
                            <div style={overlayStyle}>
                                <h1 style={{ fontSize: '42px', marginBottom: 10 }}>
                                    Chăm sóc sức khỏe toàn diện
                                </h1>
                                <p style={{ fontSize: '18px' }}>
                                    Nhanh chóng - Chính xác - Tận tâm
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>

            {/* 🔥 SECTION GIỚI THIỆU */}
            <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <h1 style={{ fontSize: '36px', marginBottom: 10 }}>
                    Chăm sóc sức khỏe tận tâm
                </h1>
                <p style={{ fontSize: '18px', color: '#666' }}>
                    Chúng tôi luôn đồng hành cùng bạn trên mọi nẻo đường.
                </p>
            </div>

            {/* 🔥 SECTION DỊCH VỤ */}
            <div style={{
                background: '#f5f5f5',
                padding: '50px 20px'
            }}>
                <Row gutter={[24, 24]} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <Col xs={24} md={8}>
                        <Card hoverable style={{ textAlign: 'center', borderRadius: 10 }}>
                            <h3>Đặt lịch nhanh</h3>
                            <p>Đặt lịch khám chỉ trong vài bước đơn giản.</p>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card hoverable style={{ textAlign: 'center', borderRadius: 10 }}>
                            <h3>Bác sĩ chuyên môn cao</h3>
                            <p>Đội ngũ bác sĩ giàu kinh nghiệm, tận tâm.</p>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card hoverable style={{ textAlign: 'center', borderRadius: 10 }}>
                            <h3>Hỗ trợ 24/7</h3>
                            <p>Luôn sẵn sàng hỗ trợ mọi lúc mọi nơi.</p>
                        </Card>
                    </Col>
                </Row>
            </div>

            {/* 🔥 SECTION CTA */}
            <div style={{
                padding: '60px 20px',
                textAlign: 'center',
                background: '#1890ff',
                color: '#fff'
            }}>
                <h2 style={{ fontSize: '32px', marginBottom: 10 }}>
                    Bắt đầu chăm sóc sức khỏe ngay hôm nay
                </h2>
                <p style={{ fontSize: '18px' }}>
                    Trải nghiệm hệ thống quản lý y tế hiện đại và tiện lợi
                </p>
            </div>

        </div>
    );
};

export default HomePage;
