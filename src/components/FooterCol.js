import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ColStyle = styled.div`
  .heading {
    font-family: "p500";
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 30px;
    /* identical to box height */

    letter-spacing: 0.2px;

    color: #ffffff;

    opacity: 0.5;
    margin-left: 2vh;
  }

  li {
    font-size: 0.5rem;
    margin-bottom: 1rem;
  }
  a {
    font-size: 1.8rem;
  }
  @media only screen and (max-width: 768px) {
    .heading1 {
      margin-left: 8rem;
      margin-bottom: 1rem;
    }
    li {
      font-size: 0.5rem;
      margin-bottom: 1rem;
    }
    a {
      font-size: 1.8rem;
      margin-left: 2.5rem;
    }
  }
`;

export default function FooterCol({
  heading = "Col Heading",
  heading1 = "col heading1",
  links = [
    {
      type: "Links",
      title: "Home",
      link: "/home",
    },
    {
      type: "Links",
      title: "About",
      link: "/about",
    },
  ],
}) {
  return (
    <ColStyle>
      <div style={{ textAlign: "initial" }}>
        <h2 className="heading">{heading}</h2>

        <ul>
          {links.map((item, index) => (
            <li key={index}>
              {item.type === "Link" ? (
                <Link to={item.link}>{item.title}</Link>
              ) : (
                <a
                  href={item.link}
                  style={{ color: "#ffffff", fontSize: "20px" }}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.title}
                </a>
              )}
            </li>
          ))}
        </ul>
        <div className="heading1">
          <p
            style={{
              fontSize: "14px",
              justifyContent: "center",
              marginLeft: "20%",
            }}
          >
            {heading1}
          </p>
        </div>
      </div>
    </ColStyle>
  );
}
