import _get from 'lodash/get'
import { apiConfig } from '@/api/api'
import { MY_LIBRARIES } from '@/js/const/films.const'

export class MovieRecord {
  constructor (record = {}, t) {
    this._record = record

    this.id = _get(record, 'id')
    this.title = _get(record, 'original_title')
    this.description = _get(record, 'overview') || t('movie-card.no-description')
    this.inMyLibrary = MY_LIBRARIES.none
    this.release = _get(record, 'release_date')
    this.alt = _get(record, 'title')
    this.src = record.poster_path 
      ? apiConfig.originalImage(record.poster_path)
      : 'public/no_img.png'
  }
}
