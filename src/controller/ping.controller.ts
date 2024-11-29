import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Ping')
@Controller('ping')
export class PingController {
  @Get('/sleep')
  @ApiOperation({ summary: 'Sleep' })
  @ApiQuery({ name: 'ms', type: Number, description: 'Sleep in ms' })
  async sleep(@Query('ms') ms: number): Promise<string> {
    await this.delay(ms);
    return `Waking up after ${ms} ms`;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  @Get('/fib')
  @ApiOperation({ summary: 'Fibonacci' })
  @ApiQuery({
    name: 'num',
    type: Number,
    description: 'Compute fibonacci',
  })
  async fib(@Query('num') num: number): Promise<number> {
    return this.fibonacci(num);
  }

  private fibonacci(num: number): number {
    if (num <= 1) return 1;
    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }
}
