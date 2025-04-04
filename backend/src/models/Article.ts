import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  keyword: string;
  description: string;
  content: string;
  date: Date;
}

const ArticleSchema: Schema = new Schema({
  title: { type: String, required: true },
  keyword: { type: String, required: true },
  description: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, required: true }
}, {
  timestamps: true
});

export default mongoose.model<IArticle>('Article', ArticleSchema); 