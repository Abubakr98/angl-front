import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import URL from "../../urls";

const IMG = styled(CardMedia)`
  padding-top: 56.25%;
`;
const BlockQ = styled.div`
  /* background-color: yellow; */
  text-align: left;
  & > div {
    /* background-color: red; */
  }
`;
function question(props) {
  const { ua, image, examples } = props.data;
  return (
    <BlockQ>
      <Typography color="primary" component="h2" variant="h4">
        {ua}
      </Typography>
      <div>
        {
          image!==null?(<IMG image={`${URL.base + URL.api + image}`} title="Image title" />):(<IMG image='https://source.unsplash.com/random' title="Image title" />)
        }
        
      </div>
      {examples.map((el, i) => {
        return (
          <Typography key={i} component="p" variant="subtitle2">
            {`${++i}.${el}.`}
          </Typography>
        );
      })}
    </BlockQ>
  );
}

export default question;
