import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsDocument = NewsCollection & Document;

@Schema()
export class NewsCollection {
    @Prop()
    title: String;

    @Prop()
    created_at: Date;

    @Prop()
    url: String;

    @Prop()
    author: String;

    @Prop()
    points: String;

    @Prop()
    story_text: String;
    
    @Prop()
    comment_text: String;

    @Prop()
    story_id: Number;

    @Prop()
    parent_id: Number;

    @Prop({type: Object})
    highlightResult;

    @Prop({type: Array})
    tags;
}

export const NewsCollectionSchema = SchemaFactory.createForClass(
    NewsCollection,
);