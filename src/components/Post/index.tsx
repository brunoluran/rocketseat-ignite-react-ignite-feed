import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FormEvent, InvalidEvent, useState } from 'react';

import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './styles.module.css';

interface ContentProps {
  type: 'paragraph' | 'link';
  content: string;
}

interface PostProps {
  author: {
    name: string;
    role: string;
    avatarUrl: string;
  };
  publishedAt: Date;
  content: ContentProps[];
}

export function Post({ author, publishedAt, content }: PostProps) {
  const [comments, setComments] = useState(['Muito bom Devon, parabéns!! 👏👏']);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormatted = format(publishedAt, "d 'de' LLLL 'ás' HH:mm'h'", {
    locale: ptBR,
  });

  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([...comments, newCommentText]);

    setNewCommentText('');
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!');
  }

  function deleteComment(commentToDelete: string) {
    const commentsWithoutTheDeletedOne = comments.filter((comment) => comment !== commentToDelete);

    setComments(commentsWithoutTheDeletedOne);
  }

  const isNewCommentValue = newCommentText.length === 0;

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          switch (line.type) {
            case 'paragraph':
              return <p key={line.content}>{line.content}</p>;
            case 'link':
              return (
                <p key={line.content}>
                  <a href='#'>{line.content}</a>
                </p>
              );
          }
        })}
      </div>
      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          placeholder='Deixe um comentário'
          value={newCommentText}
          onChange={(e) => {
            setNewCommentText(e.target.value);
            e.target.setCustomValidity('');
          }}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type='submit' disabled={isNewCommentValue}>
            Publicar
          </button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map((comment) => {
          return <Comment key={comment} content={comment} onDeleteComment={deleteComment} />;
        })}
      </div>
    </article>
  );
}
