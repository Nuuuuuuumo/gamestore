import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GameService } from './game.service';
import { Request, Response } from 'express';
import { JwtGuard } from '../../common/guards/jwt-auth.guard';
import { GiftGamesDto } from './dtos/giftGames.dto';
import { QueryParamsTypes } from './types/QueryParams.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddGameDto } from './dtos/addGame.dto';
import { BuyGameDto } from './dtos/buyGame.dto';

@ApiTags('Game')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtGuard)
  @Post('/addGame')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  addGame(
    @UploadedFile() image: Express.Multer.File,
    @Body() formData: Record<string, string>,
    @Res() res: Response,
  ) {
    const addGameDto: AddGameDto = JSON.parse(formData['data']);
    return this.gameService.addGame(res, addGameDto, image);
  }

  @ApiOperation({ summary: 'Buy one or multiple games' })
  @ApiBody({ type: BuyGameDto })
  @ApiResponse({ status: 200, description: 'Games purchased successfully' })
  @ApiResponse({
    status: 400,
    description: 'User already owns all selected games',
  })
  @ApiResponse({ status: 404, description: 'Games or user not found' })
  @UseGuards(JwtGuard)
  @Post('buy')
  buyGames(@Req() req: Request, @Body() dto: BuyGameDto) {
    return this.gameService.buyGames(dto, req.user.id);
  }

  @UseGuards(JwtGuard)
  @Post('giftGames')
  giftGames(@Req() req: Request, @Body() giftGamesDto: GiftGamesDto) {
    return this.gameService.giftGames(giftGamesDto, req.user.id);
  }

  @Get('game/:id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    return this.gameService.getGameById(id, res);
  }

  @UseGuards(JwtGuard)
  @Delete('game/:id')
  delete(@Param('id') id: string, @Res() res: Response) {
    return this.gameService.deleteGame(id, res);
  }

  @Get('/')
  getGames(@Res() res: Response) {
    return this.gameService.getGames(res);
  }

  @ApiOperation({ summary: 'Get Activity Post Pagination Enabled' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'rating', required: false, type: Number })
  @ApiQuery({ name: 'genres', required: false, type: Array<string> })
  @ApiQuery({ name: 'platforms', required: false, type: Array<string> })
  @Get('/filteredGames')
  getFilteredGames(
    @Res() res: Response,
    @Query('title') title: string,
    @Query('rating') rating: string,
    @Query('genres', new ParseArrayPipe({ separator: ',', optional: true }))
    genres: string[],
    @Query('platforms', new ParseArrayPipe({ separator: ',', optional: true }))
    platforms: string[],
  ) {
    const queryParams: QueryParamsTypes = {
      title: title,
      rating: rating,
      genres: genres,
      platforms: platforms,
    };
    return this.gameService.getFilteredGames(res, queryParams);
  }

  @Get('/getGenresAndPlatforms')
  getGenresAndPlatforms(@Res() res: Response) {
    return this.gameService.getGenresAndPlatforms(res);
  }
}
