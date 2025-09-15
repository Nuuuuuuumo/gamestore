import {ChangeEvent, useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import {
  AppBar,
  Avatar,
  Box,
  ClickAwayListener,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  Paper,
  Skeleton,
  TextField,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import {useNavigate} from "react-router-dom";

import {enqueueSnackbar} from "notistack";

import {useLogoutMutation, useMeQuery} from "@/entities/authentification/api/authApi";
import {selectIsAuth} from "@/entities/authentification/model/slice";
import {ProfileButton} from "@/features/user";
import {CartButton} from "@/features/user/CartButton/ui/CartButton";
import {useAppDispatch, useAppSelector} from "@/shared/model/hooks";
import {RedirectLink} from "@/shared/ui";
import {ThemeToggleButton} from "@/entities/theme/ui/ThemeToggleButton/ThemeToggleButton";
import {useGameSearchFilters} from "@/shared/hooks/useGameSearchFilteres";


export const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(727));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutMutation] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const [, setAnchorElUser] = useState<null | HTMLElement>(null);
  
  useMeQuery();
  const isAuth = useAppSelector(selectIsAuth);
  const userData = useAppSelector((state: RootState) => state.session.data);
  const navigate = useNavigate();
  
  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };
  
  const {filters, setFilters, queryResult} = useGameSearchFilters();
  const games = queryResult.data || [];
  const [openDropdown, setOpenDropdown] = useState(false);
  
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({
      ...prev,
      title: e.target.value,
    }));
    setOpenDropdown(true);
  };
  
  const handleLogout = async () => {
    await logoutMutation().unwrap().then((payload) => {
      enqueueSnackbar(payload?.message, {variant: "success"});
      
    }).finally(() => {
      dispatch({type: "logout"});
      setAnchorElUser(null);
      navigate("/");
    });
  };
  
  const handleSelectGame = (id: string) => {
    setOpenDropdown(false);
    setFilters(prev => ({...prev, title: ""}));
    navigate(`/games/${id}`);
  };
  
  const renderDrawerContent = () => (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: "#141414",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
      role="presentation"
    >
      <List sx={{p: 0}}>
        <ListItem
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            py: 2,
            justifyContent: "center",
          }}
          onClick={toggleDrawer(false)}
        >
          <RedirectLink redirectTo="/">
            <Box
              component="img"
              sx={{height: 54}}
              alt="Your logo."
              src="https://mygamestore3.s3.eu-north-1.amazonaws.com/images/logo"
            />
          </RedirectLink>
        </ListItem>
      </List>
      
      <List sx={{flexGrow: 1, pt: 0}}>
        <ListItemButton
          onClick={toggleDrawer(false)}
          sx={{
            py: 1.5,
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.05)",
            },
          }}
        >
          <RedirectLink
            redirectTo="/games"
            sx={{
              color: "#fff",
              width: "100%",
              fontSize: "16px",
              "&:hover": {color: theme.palette.primary.main},
            }}
          >
            Games
          </RedirectLink>
        </ListItemButton>
        
        {isAuth && (
          <ListItemButton
            onClick={toggleDrawer(false)}
            sx={{
              py: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.05)",
              },
            }}
          >
            <RedirectLink
              redirectTo="/addGame"
              sx={{
                color: "#fff",
                width: "100%",
                fontSize: "16px",
                "&:hover": {color: theme.palette.primary.main},
              }}
            >
              Add Game
            </RedirectLink>
          </ListItemButton>
        )}
        
        {!isAuth && (
          <>
            <ListItemButton
              onClick={toggleDrawer(false)}
              sx={{
                py: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <RedirectLink
                redirectTo="/login"
                sx={{
                  color: "#fff",
                  width: "100%",
                  fontSize: "16px",
                  "&:hover": {color: theme.palette.primary.main},
                }}
              >
                Sign in
              </RedirectLink>
            </ListItemButton>
            
            <ListItemButton
              onClick={toggleDrawer(false)}
              sx={{
                py: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.05)",
                },
              }}
            >
              <RedirectLink
                redirectTo="/register"
                sx={{
                  color: "#fff",
                  width: "100%",
                  fontSize: "16px",
                  "&:hover": {color: theme.palette.primary.main},
                }}
              >
                Sign Up
              </RedirectLink>
            </ListItemButton>
          </>
        )}
      </List>
      
      {isAuth && (
        <Box sx={{
          mt: "auto",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          p: 2,
          display: "flex",
          justifyContent: "space-around",
        }}>
          <Box onClick={(e) => e.stopPropagation()}>
            <CartButton/>
          </Box>
          <RedirectLink redirectTo="/profile">
            <Box onClick={(e) => e.stopPropagation()}>
              <IconButton sx={{p: 0}}>
                <Avatar alt="Remy Sharp" style={{borderRadius: "25%", border: "0.5px solid #292929"}}
                  src={userData?.avatarURL}/>
              </IconButton>
            </Box>
          </RedirectLink>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Box>
      )}
    </Box>
  );
  
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.secondary.main, // Dark regardless of theme
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        position: "relative",
        padding: "5px 0 5px 0",
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          minHeight: "80px",
        }}
      >
        {isMobile && (
          <>
            <IconButton
              size="large"
              edge="start"
              sx={{color: "#fff"}}
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon/>
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  backgroundColor: "#141414",
                  color: "#fff",
                },
              }}
            >
              {renderDrawerContent()}
            </Drawer>
          </>
        )}
        {!isMobile && (
          <>
            <RedirectLink redirectTo="/">
              <Box
                component="img"
                sx={{height: 64}}
                alt="Your logo."
                src="https://mygamestore3.s3.eu-north-1.amazonaws.com/images/logo"
              />
            </RedirectLink>
            <Box
              sx={{
                display: "flex",
                gap: "24px",
                marginLeft: "5px",
                "& a": {
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                },
              }}
            >
              <RedirectLink redirectTo="/games">Games</RedirectLink>
              {isAuth && <RedirectLink redirectTo="/addGame">Add Game</RedirectLink>}
            </Box>
          </>
        )}
        <Box sx={{display: "flex", alignItems: "center", gap: 1, marginLeft: "auto"}}>
          <Box sx={{position: "relative", width: isMobile ? "100%" : "250px"}}>
            <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
              <Box>
                <TextField
                  type="text"
                  variant="outlined"
                  autoComplete="off"
                  placeholder="Search"
                  value={filters.title}
                  onChange={handleSearchChange}
                  fullWidth
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.12)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(255, 255, 255, 0.16)",
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: theme.palette.primary.main,
                          borderWidth: 1,
                        },
                      },
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "rgba(255, 255, 255, 0.2)",
                    },
                    "& .MuiOutlinedInput-input": {
                      color: "#fff",
                      "&::placeholder": {
                        color: "rgba(255, 255, 255, 0.5)",
                        opacity: 1,
                      },
                    },
                    "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                      color: "rgba(255, 255, 255, 0.7)",
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon/>
                      </InputAdornment>
                    ),
                  }}
                />
                {openDropdown && filters.title && (
                  <Paper
                    elevation={3}
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: isMobile ? "90vw" : 375,
                      zIndex: 10,
                      maxHeight: 350,
                      overflowY: "auto",
                      mt: 0.5,
                      borderRadius: 2,
                      backgroundColor: theme.palette.mode === "dark"
                        ? "#1A1A1A"
                        : "#232733",
                      boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
                      border: `1px solid ${theme.palette.mode === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.1)"}`,
                    }}
                  >
                    {queryResult.isFetching ? (
                      Array.from({length: 5}).map((_, idx) => (
                        <Box key={idx} sx={{display: "flex", alignItems: "center", p: 1}}>
                          <Skeleton
                            variant="rectangular"
                            width={50}
                            height={50}
                            sx={{
                              borderRadius: 1,
                              mr: 2,
                              backgroundColor: theme.palette.mode === "dark"
                                ? "rgba(255, 255, 255, 0.1)"
                                : "rgba(0, 0, 0, 0.1)",
                            }}
                          />
                          <Box sx={{flexGrow: 1}}>
                            <Skeleton
                              width="60%"
                              height={20}
                              sx={{
                                backgroundColor: theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            <Skeleton
                              width="40%"
                              height={16}
                              sx={{
                                backgroundColor: theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.1)"
                                  : "rgba(0, 0, 0, 0.1)",
                              }}
                            />
                          </Box>
                        </Box>
                      ))
                    ) : games.length === 0 ? (
                      <Box sx={{
                        p: 2,
                        textAlign: "center",
                        color: theme.palette.mode === "dark"
                          ? "rgba(255, 255, 255, 0.6)"
                          : "rgba(255, 255, 255, 0.7)",
                      }}>
                        No results found
                      </Box>
                    ) : (
                      <List dense>
                        {games.slice(0, 6).map((game) => (
                          <ListItemButton
                            key={game.id}
                            onClick={() => handleSelectGame(game.id)}
                            sx={{
                              transition: "background-color 0.2s ease",
                              "&:hover": {
                                backgroundColor: theme.palette.mode === "dark"
                                  ? "rgba(255, 255, 255, 0.05)"
                                  : "rgba(255, 255, 255, 0.1)",
                              },
                            }}
                          >
                            <Box sx={{display: "flex", alignItems: "center", width: "100%"}}>
                              <Box
                                component="img"
                                src={game.imageUrl}
                                alt={game.title}
                                sx={{
                                  width: 50,
                                  height: 50,
                                  objectFit: "cover",
                                  borderRadius: 1,
                                  mr: 2,
                                  flexShrink: 0,
                                }}
                              />
                              <Box sx={{flexGrow: 1, overflow: "hidden"}}>
                                <Box sx={{
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  color: "#fff",
                                }}>
                                  {game.title}
                                </Box>
                                <Box sx={{
                                  fontSize: "0.8rem",
                                  color: theme.palette.mode === "dark"
                                    ? "rgba(255, 255, 255, 0.7)"
                                    : "rgba(255, 255, 255, 0.8)",
                                }}>
                                  ⭐ {game.rating} | {game.platforms.map(p => p.name).join(", ")}
                                </Box>
                              </Box>
                            </Box>
                          </ListItemButton>
                        ))}
                      </List>
                    )}
                  </Paper>
                )}
              </Box>
            </ClickAwayListener>
          </Box>
          
          <Box sx={{padding: "0 10px"}}>
            <ThemeToggleButton/>
          </Box>
          {!isMobile && (
            <>
              <Divider
                sx={{
                  width: "3px",
                  height: "15px",
                  borderRadius: "3px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }}
                orientation="vertical"
              />
              <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                "& a": {
                  color: "#fff",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "16px",
                  transition: "color 0.2s ease",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                },
              }}>
                {isAuth ? (
                  <>
                    <CartButton/>
                    <ProfileButton/>
                  </>
                ) : (
                  <>
                    <RedirectLink redirectTo="/login">Sign in</RedirectLink>
                    <RedirectLink redirectTo="/register">Sign Up</RedirectLink>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};