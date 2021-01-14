import Publication from '../models/Publication';

import imagesView from './images_view';
import tagsView from './tags_view';

export default {
    render(publication: Publication) {
        return {
            content: publication.content,
            tags: tagsView.renderMany(publication.publicationConnection)
        }
    },

    renderMany(publications: Publication[]) {
        return publications.map(publication => this.render(publication))
    }
}