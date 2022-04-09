import React from 'react';
import { Grid, Text, Image } from '../components/ui';
import { Button, Upload } from '../components/core';
import { useHistory } from 'react-router-dom';

const Main = (props) => {
  const history = useHistory;

  return (
    <React.Fragment>
      <Grid bg={'#EFF6FF'} padding='20px 0px'>
        <Grid>
          <Grid is_flex padding='4px 16px'>
            <Button
              text='업로드'
              _onClick={() => {
                history.push('/Write');
              }}
            ></Button>
          </Grid>
          <Text>님 안녕하세요!</Text>

          <Grid is_flex padding='4px 16px'>
            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />

            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />

            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />
          </Grid>

          <Grid is_flex padding='4px 16px'>
            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />

            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />

            <Grid>
              <Image
                width='50vh'
                shape='circle'
                src='https://t1.daumcdn.net/cfile/tistory/997E5C3C5BA1E68137'
              />
              <Text>luke</Text>
            </Grid>
            <img
              width={300}
              src='https://www.bigjungbo.com/files/attach/images/163/952/878/009/70954840c442cac5c338e2e9a7ed1ce7.jpeg'
            />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Main;
