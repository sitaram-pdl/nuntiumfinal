import React from "react";

import styled from "styled-components";
import FooterCol from "./FooterCol";

const FooterStyle = styled.div`
  background-color: var(--deep-black);
  padding-top: 10rem;
  text-align: center;
  color: white;
  background-color: red;
  .container {
    margin-top: 20vh;
    display: flex;
    gap: 10rem;
    justify-content: space-between;
    align-items: center;
  }

  .footer__col2 {
    flex: 1;
  }

  .footer__col3 {
    flex: 1;
  }
  .footer__col4 {
    flex: 1;

    max-width: 40rem;
  }
  .footer__col1__title {
    font-size: 3.5rem;
    margin-bottom: 1rem;
  }
  .copyright {
    background-color: var(--dark-bg);
    text-align: left;
    padding: 1rem 0;
    margin-top: 5rem;
    .para {
      margin-left: 0;
    }
  }
  @media only screen and (max-width: 768px) {
    .container {
      flex-direction: column;
      gap: 0rem;
      & > div {
        margin-top: 5rem;
      }
    }
    .footer__col1 .para {
      max-width: 100%;
    }
    .copyright {
      .container {
        div {
          margin-top: 0;
        }
      }
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyle>
      <div className="container">
        <div className="footer__col2">
          <FooterCol
            heading="Currently at"
            heading1="See Map"
            links={[
              {
                title: "Sangam Marga , New-road , ",

                link: "https://www.google.com/maps/place/Black+Tech/@28.2185158,83.9829083,17z/data=!3m1!4b1!4m5!3m4!1s0x399595682b1e1c4f:0x4e5b967423964488!8m2!3d28.2185074!4d83.9851376",
              },
              {
                title: "Pokhara-08 , Nepal",
                link: "https://www.google.com/maps/place/Black+Tech/@28.2185158,83.9829083,17z/data=!3m1!4b1!4m5!3m4!1s0x399595682b1e1c4f:0x4e5b967423964488!8m2!3d28.2185074!4d83.9851376",
              },
            ]}
          />
        </div>
        <div className="footer__col3">
          <FooterCol
            heading="Email"
            heading1="Send Mail"
            links={[
              {
                title: "info@blacktech.com.np",
                link: "mailto:info@blacktech.com.np",
              },
              {
                title: "jobs@blacktech,com.np",
                link: "mailto:jobs@blacktech,com.np",
              },
            ]}
          />
        </div>
        <div className="footer__col4">
          <FooterCol
            heading="Phone"
            heading1="Call Us"
            links={[
              {
                title: "+977 9825165567",
                link: "tel:+9779825165567",
              },
              {
                title: "+977 9802839908",
                link: "tel:+9779802839908",
              },
            ]}
          />
        </div>
      </div>
      <div></div>
      <div className="footicons">
        <div className="footericon">
          <a href="https://instagram.com"></a>{" "}
          <a href="https://facebook.com/"></a>
          <a href="https://twitter.com/"></a>
        </div>
      </div>
      <div
        style={{
          bottom: 0,
          zIndex: 100,
          backgroundColor: "black",
          color: "white",

          opacity: 0.7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          fontFamily: "RobotoMono Regular",
          fontSize: 17,
        }}
      >
        Copyright {new Date().getFullYear()} @ Black Tech Pvt. Ltd.
      </div>
    </FooterStyle>
  );
}
