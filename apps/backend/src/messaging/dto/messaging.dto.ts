import { IsString, IsOptional, IsEnum, IsArray } from 'class-validator';
import { MessageType } from '@carmaconcierge/shared';

export class CreateConversationDto {
  @IsArray()
  @IsString({ each: true })
  participants: string[];

  @IsOptional()
  @IsString()
  jobId?: string;

  @IsOptional()
  @IsString()
  quoteId?: string;
}

export class CreateMessageDto {
  @IsString()
  conversationId: string;

  @IsEnum(MessageType)
  type: MessageType;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  attachments?: string[];
}