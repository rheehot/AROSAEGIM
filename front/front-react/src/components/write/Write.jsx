import React, { Component } from "react";
import styled from "styled-components";
import LockOpenOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MapIcon from "@material-ui/icons/Map";
import { IconButton } from "@material-ui/core";
import TextInput from "../common/inputs/TextInput";
import Chip from "../common/chip/Chip";
import DefaultButton from "../common/buttons/DefaultButton";
import CtoW from "../../apis/w3w";
class Write extends Component {
  constructor() {
    super();
    this.state = {
      locked: false,
      location: null,
      w3w: null,
    };
  }
  componentDidMount() {
    if (navigator.geolocation) {
      // GPS를 지원
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState(
            {
              location: [position.coords.latitude, position.coords.longitude],
            },
            () =>
              // alert([
              //   position.coords.latitude + " " + position.coords.longitude,
              // ])
              console.log(this.state.location)
          );
        },
        function(error) {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.w3w !== prevState.w3w) {
      const getWWW = async () => {
        var www = await CtoW(this.state.location[0], this.state.location[1]);
        this.setState({
          w3w: www.data.words,
        });
      };
      getWWW();
      console.log(this.state.w3w)
    }
  }
  lockOrUnlock = () => {
    if (this.state.locked) {
      this.setState({ locked: false });
    } else {
      this.setState({ locked: true });
    }
  };

  render() {
    const locked = this.state.locked;
    let icon;
    if (locked) {
      icon = <LockOutlinedIcon />;
    } else {
      icon = <LockOpenOutlinedIcon />;
    }

    return (
      <Wrapper>
        <Container>
          <Lock onClick={this.lockOrUnlock}>{icon}</Lock>
          <Text>
            <TextInput />
          </Text>
          <Addition>
            <Map onClick={this.getLocation}>
              <MapIcon />
              <span>{this.state.w3w}</span>
            </Map>
            <Tag onClick={() => alert("태그 곧 넣을게요ㅠ")}>
              <LocalOfferIcon />
              <Chip size="small" text="태그1" />
              <Chip size="small" text="태그2" />
            </Tag>
          </Addition>
          <ButtonContainer>
            <DefaultButton text="작성" onClick={() => alert('작성완료!')}/>
          </ButtonContainer>
        </Container>
      </Wrapper>
    );
  }
}
export default Write;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: 100vh;
  background-color: #e6d7bb;
`;

const Container = styled.div`
  padding: 8px;
  position: relative;
  bottom: 16vh;
  background-color: #dcc29b;
  margin-left: 8vw;
  margin-right: 8vw;
  width: 84vw;
  height: 48vh;
  display: grid;
  grid-template-rows: 1fr 4fr 2fr;
  grid-template-columns: 1fr 8fr 1fr;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 16px;
`;
const Lock = styled(IconButton)`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  grid-column: 4 / 4;
  grid-row: 1 / 1;
  outline: none;
`;
const Text = styled.div`
  justify-content: center;
  align-items: center;
  display: flex;
  grid-column: 1 / 5;
  grid-row: 2 / 2;
`;
const Addition = styled.div`
  grid-column: 1 / 3;
  grid-row: 3 / 3;
`;

const Map = styled(IconButton)`
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;
const Tag = styled(IconButton)`
  margin: none;
  padding: none;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  grid-column: 4 / 4;
  grid-row: 3 / 3;
`;
