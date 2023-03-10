import React, { useEffect, useState } from "react";
import { Grid, Button, Card, CardContent, CardActions, Typography, Box, FormControl, InputLabel, Select, ToggleButtonGroup, ToggleButton, Divider, MenuItem, TextField, SelectChangeEvent } from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import './Audiences.css';
import { AnyMxRecord } from "dns";

function Audiences() {
  const [audience, setAudience] = useState<any[]>([]);
  const [sortType, setSortType] = useState('');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    fetchAudienceData();
    setSortType('0');
  }, []);

  const fetchAudienceData = async () => {
    return fetch("http://localhost:3000/audiences")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setAudience(data);
      })
  }

  const selectSortField = (event: SelectChangeEvent) => {
    const val = event.target.value;
    setSortType(val);
    setSortAsc(true);
    sortAudience(val, true);
  };

  const sortAudience = (val: string, asc: boolean) => {
    let aud = [...audience];
    if (val === '0') {
      aud.sort((a: any, b: any) => {
        return asc ? a.id - b.id : b.id - a.id;
      });
    } else if (val === '1') {
      aud.sort((a: any, b: any) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
    } else if (val === '2') {
      aud.sort((a: any, b: any) => {
        return asc ? a.totalSize - b.totalSize : b.totalSize - a.totalSize;
      });
    }
    setAudience(aud);
  };

  const handleSortAsc = (
    event: any,
    newSortAsc: boolean,
  ) => {
    setSortAsc(newSortAsc);
    sortAudience(sortType, newSortAsc);
  };

  const onSearch = (event: any) => {
    setSearchValue(event?.target?.value?.toLocaleLowerCase());
  };

  const filteredItems = audience
    .filter(
      item =>
        item?.name?.toLocaleLowerCase().includes(searchValue) ||
        item?.id?.toLocaleLowerCase().includes(searchValue)
    );

  const searchedAudiences = searchValue ? filteredItems : audience;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Audience Name', width: 320 },
    {
      field: 'fullName',
      headerName: 'Demographic/Transaction',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 210,
      valueGetter: (params: GridValueGetterParams) =>
        `${params.row.dimensions[0].size || ''} / ${params.row.dimensions[1].size || ''}`,
    },
    { field: 'totalSize', headerName: 'Audience size', width: 120 },
  ];

  const AudienceData = () => {
    return (
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={searchedAudiences}
          columns={columns}
          pageSizeOptions={[5]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        />
      </div>
    );
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={8} gap={2}>
        <Card>
          <CardContent>
            <AudienceData />
          </CardContent>
          <CardActions>
            <Button size="small">See More</Button>
          </CardActions>
        </Card>
      </Grid>
      <Grid item xs={4}>
        <Card>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Manual Controls
            </Typography>
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs gap={2}>
                  <TextField id="search" label="Search Id or Name" variant="standard" onKeyUp={onSearch} />
                </Grid>
              </Grid>
            </Box>
            <Divider variant="middle" />
            <Box mt={2} mb={2}>
              <Grid container spacing={2}>
                <Grid item xs gap={2}>
                  <FormControl fullWidth variant="standard">
                    <InputLabel id="sort-select-label">Sort</InputLabel>
                    <Select
                      labelId="sort-select-label"
                      id="sort-type-select"
                      value={sortType}
                      label="Sort"
                      onChange={selectSortField}
                    >
                      <MenuItem value={'0'}>Id</MenuItem>
                      <MenuItem value={'1'}>Name</MenuItem>
                      <MenuItem value={'2'}>Audience Size</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs gap={2}>
                  <ToggleButtonGroup
                    value={sortAsc}
                    exclusive
                    onChange={handleSortAsc}
                    aria-label="text alignment"
                  >
                    <ToggleButton value={true} aria-label="Ascending">
                      <ArrowUpward />
                    </ToggleButton>
                    <ToggleButton value={false} aria-label="Descending">
                      <ArrowDownward />
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Audiences;
