import "./TrustedBy.scss";
// import T1 from '../../../public/amazon.jpg'
// import T2 from '../../../public/amd.png'
// import T3 from '../../../public/cisco.png'
// import T4 from '../../../public/dropc.png'
// import T5 from '../../../public/logitech.png'


const TrustedBy = () => {
  return (
    <div className="trustedBy">
      <div className="container">
        <span>Trusted by the world’s best</span>
        <div className="">
          <img src="amazon.jpg" alt="" width='70px'/>
          <img src="amd.jpg" alt="" width='60px'/>
          <img src="cisco.jpg" alt="" width='60px'/>
          <img src="dropc.jpg" alt="" width='70px'/>
          <img src="logitech.jpg" alt="" width='70px'/>
        </div>
      </div>
    </div>
  );
};

export default TrustedBy;
