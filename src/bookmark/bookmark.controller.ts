import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private BookmarkService: BookmarkService) {}

  @Get()
  getBookmark(@GetUser('id') userid: number) {
    return this.BookmarkService.getBookmarks(userid);
  }

  @Get(':id')
  GetBookmarkById(
    @GetUser('id') userid: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.BookmarkService.GetBookmarkById(userid, bookmarkId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userid: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.BookmarkService.createBookmark(userid, dto);
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userid: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.BookmarkService.editBookmarkById(userid, bookmarkId, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteBookMarkById(
    @GetUser('id') userid: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.BookmarkService.deleteBookMarkById(userid, bookmarkId);
  }
}
