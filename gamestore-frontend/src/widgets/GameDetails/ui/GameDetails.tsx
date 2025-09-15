import {Box, Button, Chip, Container, Divider, Grid, Paper, Typography, useTheme} from "@mui/material";
import {enqueueSnackbar} from "notistack";
import React from "react";
import {useSelector} from "react-redux";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import DevicesIcon from "@mui/icons-material/Devices";
import BusinessIcon from "@mui/icons-material/Business";
import CodeIcon from "@mui/icons-material/Code";
import StarIcon from "@mui/icons-material/Star";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

import type {Game} from "@/shared/api";

import {useAddGameToBucketMutation} from "@/entities/bucket/api/bucketApi";
import {selectUserBucketGames} from "@/entities/bucket/model/slice";
import {useBuyGamesMutation} from "@/entities/game/api/gameAPi";
import {useLazyMeQuery} from "@/entities/authentification/api/authApi";

type GameDetails = {
  game: Game
}

export const GameDetails = ({game}: GameDetails) => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  const [triggerFetchMe] = useLazyMeQuery();
  
  const games = useSelector(selectUserBucketGames) ?? [];
  const ownedGames = useSelector((state: RootState) => state.session.data?.games) ?? [];
  const isOwnedGame = ownedGames.some((item: Game) => item.id === game.id);
  
  const [addGameToCard, {
    isSuccess: isAddGameToCartSuccess,
    isLoading: isAddGameToCartLoading,
  }] = useAddGameToBucketMutation();
  
  // Add the buyGames mutation hook
  const [buyGames, {
    isLoading: isBuyingGame,
  }] = useBuyGamesMutation();
  
  const isGameInCart = games.some((item: Game) => item.id === game.id);
  
  const addGameToCart = async () => {
    await addGameToCard(game.id)
      .unwrap();
    
    if (isAddGameToCartSuccess) {
      enqueueSnackbar("Successfully added game to cart!", {variant: "success"});
    }
  };
  
  
  // Add buy now handler
  const handleBuyNow = async () => {
    
    const result = await buyGames({
      games: [game.id],  // Send array with single game ID
    }).unwrap();
    if (result) {
      await triggerFetchMe();
      enqueueSnackbar(result.message || "Game purchased successfully!", {variant: "success"});
    }
    
  };
  
  return (
    <Box sx={{
      bgcolor: theme.palette.background.default,
      color: theme.palette.text.primary,
      pb: 6,
    }}>
      {/* Hero Banner Section */}
      <Box
        sx={{
          position: "relative",
          height: "70vh",
          width: "100%",
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            height: "100%",
            background: `linear-gradient(to bottom,
              rgba(${isDarkMode ? "18,18,18" : "255,255,255"},0.1) 0%,
              rgba(${isDarkMode ? "18,18,18" : "255,255,255"},0.6) 50%,
              ${theme.palette.background.default} 100%),
              url(${game.imageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 1,
          }}
        />
        
        <Container sx={{position: "relative", zIndex: 2, pb: 4}}>
          <Typography variant="h1" sx={{
            fontWeight: 900,
            fontSize: {xs: "2.5rem", md: "4rem"},
            textShadow: isDarkMode
              ? "2px 2px 4px rgba(0,0,0,0.5)"
              : "1px 1px 3px rgba(0,0,0,0.3)",
          }}>
            {game.title}
          </Typography>
          
          <Box sx={{display: "flex", alignItems: "center", mt: 1}}>
            <Box sx={{
              bgcolor: theme.palette.primary.main,
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              display: "flex",
              alignItems: "center",
            }}>
              <StarIcon sx={{fontSize: 18, mr: 0.5, color: "#FFD700"}}/>
              <Typography variant="body2" fontWeight="bold" color="primary.contrastText">
                {game.rating}/10
              </Typography>
            </Box>
            
            <Divider orientation="vertical" flexItem sx={{
              mx: 2,
              bgcolor: isDarkMode
                ? "rgba(255,255,255,0.3)"
                : "rgba(0,0,0,0.2)",
            }}/>
            
            <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
              {game.genres.slice(0, 3).map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  size="small"
                  sx={{
                    bgcolor: isDarkMode
                      ? "rgba(255,255,255,0.1)"
                      : "rgba(0,0,0,0.06)",
                    color: theme.palette.text.primary,
                    "&:hover": {
                      bgcolor: isDarkMode
                        ? "rgba(255,255,255,0.2)"
                        : "rgba(0,0,0,0.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        </Container>
      </Box>
      
      <Container sx={{mt: -6, position: "relative", zIndex: 3}}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{
              bgcolor: theme.palette.background.paper,
              p: 3,
              borderRadius: 3,
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(0,0,0,0.3)"
                : "0 4px 20px rgba(0,0,0,0.08)",
              border: isDarkMode
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.03)",
            }}>
              <Typography variant="h5" fontWeight="bold" sx={{mb: 2}}>
                About {game.title}
              </Typography>
              <Typography
                variant="body1"
                paragraph
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.7,
                }}
              >
                {game.description}
              </Typography>
              
              <Box sx={{mt: 3}}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{mb: 1, display: "flex", alignItems: "center"}}
                >
                  <LocalOfferIcon sx={{mr: 1, color: theme.palette.secondary.light}}/>
                  Genres
                </Typography>
                <Box sx={{display: "flex", flexWrap: "wrap", gap: 1}}>
                  {game.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      clickable
                      sx={{
                        bgcolor: isDarkMode
                          ? "rgba(0,116,228,0.2)"
                          : "rgba(0,116,228,0.1)",
                        color: theme.palette.text.primary,
                        "&:hover": {
                          bgcolor: isDarkMode
                            ? "rgba(0,116,228,0.3)"
                            : "rgba(0,116,228,0.2)",
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{mt: 3}}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{mb: 1, display: "flex", alignItems: "center"}}
                >
                  <CalendarTodayIcon sx={{mr: 1, color: theme.palette.secondary.light}}/>
                  Release Information
                </Typography>
                <Typography variant="body2" sx={{color: theme.palette.text.secondary}}>
                  from players worldwide.
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper sx={{
              bgcolor: theme.palette.background.paper,
              p: 3,
              borderRadius: 3,
              boxShadow: isDarkMode
                ? "0 4px 20px rgba(0,0,0,0.3)"
                : "0 4px 20px rgba(0,0,0,0.08)",
              border: isDarkMode
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.03)",
            }}>
              <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: theme.palette.primary.main,
                py: 2,
                borderRadius: 2,
                mb: 3,
              }}>
                <Typography variant="h4" fontWeight="bold" color="primary.contrastText">
                  ${game.price}
                </Typography>
              </Box>
              
              <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleBuyNow}
                  disabled={isOwnedGame || isBuyingGame}
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    color: theme.palette.secondary.contrastText,
                    fontWeight: "bold",
                    py: 1.5,
                    "&:hover": {bgcolor: theme.palette.secondary.light},
                    "&:disabled": {
                      bgcolor: isDarkMode
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(0,0,0,0.1)",
                      color: isDarkMode
                        ? "#a0a0a0"
                        : "rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  {isOwnedGame
                    ? "OWNED"
                    : isBuyingGame
                      ? "PROCESSING..."
                      : "BUY NOW"}
                </Button>
                
                <Button
                  disabled={isGameInCart || isAddGameToCartLoading}
                  variant="contained"
                  fullWidth
                  startIcon={<ShoppingCartIcon/>}
                  onClick={addGameToCart}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    fontWeight: "bold",
                    color: theme.palette.secondary.contrastText,
                    py: 1.5,
                    "&:disabled": {
                      bgcolor: isDarkMode
                        ? "rgba(0,116,228,0.3)"
                        : "rgba(0,116,228,0.15)",
                      color: isDarkMode
                        ? "#a0a0a0"
                        : "rgba(0,0,0,0.4)",
                    },
                  }}
                >
                  {isGameInCart ? "IN CART" : (isAddGameToCartLoading ? "ADDING..." : "ADD TO CART")}
                </Button>
              
              </Box>
              
              <Divider sx={{
                my: 3,
                bgcolor: isDarkMode
                  ? "rgba(255,255,255,0.1)"
                  : "rgba(0,0,0,0.1)",
              }}/>
              
              <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
                <Typography variant="subtitle1" sx={{display: "flex", alignItems: "center"}}>
                  <Box sx={{display: "flex"}}>
                    <DevicesIcon sx={{mr: 1.5, color: theme.palette.secondary.light}}/>
                    <Typography component="span" fontWeight="bold" sx={{width: 100}}>Platforms:</Typography>
                  </Box>
                  <Typography component="span" sx={{color: theme.palette.text.secondary}}>
                    {game.platforms.map((platform) => platform.name).join(", ")}
                  </Typography>
                </Typography>
                
                <Typography variant="subtitle1" sx={{display: "flex", alignItems: "center"}}>
                  <Box sx={{display: "flex"}}>
                    <BusinessIcon sx={{mr: 1.5, color: theme.palette.secondary.light}}/>
                    <Typography component="span" fontWeight="bold" sx={{width: 100}}>Publisher:</Typography>
                  </Box>
                  <Typography component="span" sx={{color: theme.palette.text.secondary}}>
                    {game.publisher}
                  </Typography>
                </Typography>
                
                <Typography variant="subtitle1" sx={{display: "flex", alignItems: "center"}}>
                  <Box sx={{display: "flex"}}>
                    <CodeIcon sx={{mr: 1.5, color: theme.palette.secondary.light}}/>
                    <Typography component="span" fontWeight="bold" sx={{width: 100}}>Developer:</Typography>
                  </Box>
                  <Chip label={game.developer} sx={{color: theme.palette.text.secondary}}/>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};