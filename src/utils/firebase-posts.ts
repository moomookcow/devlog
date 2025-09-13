import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  increment,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import type { PostStats, Comment } from "./mdx";

// Firestore 컬렉션 이름
const POSTS_COLLECTION = "posts";
const COMMENTS_COLLECTION = "comments";

// 개발 환경에서만 에러 로그 출력
const isDev = import.meta.env.DEV;

// Firebase 연결 상태 확인
let isFirebaseConnected = true;

// 포스트 통계 가져오기 (Firebase 비활성화 - 기본값만 사용)
export async function getPostStats(
  firebaseId: string
): Promise<PostStats | null> {
  // Firebase 연결 비활성화 - 항상 기본값 반환
  if (isDev) {
    console.log("Firebase 비활성화 - 기본값 사용");
  }
  isFirebaseConnected = false;

  return {
    firebaseId,
    viewCount: 0,
    likes: 0,
    comments: [],
  };
}

// 조회수 증가 (Firebase 비활성화)
export async function incrementViewCount(firebaseId: string): Promise<void> {
  // Firebase 비활성화 - 조회수 증가 기능 비활성화
  if (isDev) {
    console.log(
      `조회수 증가 기능 비활성화 (Firebase 비활성화) - ${firebaseId}`
    );
  }
  // 아무것도 하지 않음
}

// 좋아요 토글
export async function toggleLike(
  firebaseId: string,
  userId: string
): Promise<{ success: boolean; isLiked: boolean }> {
  try {
    if (!db) {
      if (isDev) {
        console.warn("Firebase not initialized - 좋아요 토글 비활성화");
      }
      return { success: false, isLiked: false };
    }

    const docRef = doc(db, POSTS_COLLECTION, firebaseId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      const likedBy = data.likedBy || [];
      const isLiked = likedBy.includes(userId);

      if (isLiked) {
        // 좋아요 취소
        await updateDoc(docRef, {
          likes: increment(-1),
          likedBy: likedBy.filter((id: string) => id !== userId),
        });
        return { success: true, isLiked: false };
      } else {
        // 좋아요 추가
        await updateDoc(docRef, {
          likes: increment(1),
          likedBy: [...likedBy, userId],
        });
        return { success: true, isLiked: true };
      }
    }

    return { success: false, isLiked: false };
  } catch (error) {
    if (isDev) {
      console.warn("좋아요 토글 실패:", error);
    }
    return { success: false, isLiked: false };
  }
}

// 댓글 추가
export async function addComment(
  firebaseId: string,
  comment: Omit<Comment, "id" | "createdAt">
): Promise<{ success: boolean; commentId?: string }> {
  try {
    if (!db) {
      if (isDev) {
        console.warn("Firebase not initialized - 댓글 추가 비활성화");
      }
      return { success: false };
    }

    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const newComment = {
      ...comment,
      postId: firebaseId,
      createdAt: new Date().toISOString(),
      isApproved: false, // 관리자 승인 필요
    };

    const docRef = await addDoc(commentsRef, newComment);

    // 포스트의 댓글 수도 증가
    const postRef = doc(db, POSTS_COLLECTION, firebaseId);
    await updateDoc(postRef, {
      commentCount: increment(1),
    });

    return { success: true, commentId: docRef.id };
  } catch (error) {
    if (isDev) {
      console.warn("댓글 추가 실패:", error);
    }
    return { success: false };
  }
}

// 포스트의 댓글 목록 가져오기
export async function getPostComments(firebaseId: string): Promise<Comment[]> {
  try {
    if (!db) {
      if (isDev) {
        console.warn("Firebase not initialized - 댓글 목록 가져오기 비활성화");
      }
      return [];
    }

    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const q = query(
      commentsRef,
      where("postId", "==", firebaseId),
      where("isApproved", "==", true),
      orderBy("createdAt", "desc")
    );

    const querySnapshot = await getDocs(q);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        author: data.author,
        content: data.content,
        createdAt: data.createdAt,
        isApproved: data.isApproved,
      });
    });

    return comments;
  } catch (error) {
    if (isDev) {
      console.warn("댓글 목록 가져오기 실패:", error);
    }
    return [];
  }
}

// 인기 포스트 가져오기 (조회수 기준)
export async function getPopularPosts(
  limitCount: number = 5
): Promise<{ firebaseId: string; viewCount: number }[]> {
  try {
    if (!db) {
      if (isDev) {
        console.warn(
          "Firebase not initialized - 인기 포스트 가져오기 비활성화"
        );
      }
      return [];
    }

    const postsRef = collection(db, POSTS_COLLECTION);
    const q = query(postsRef, orderBy("viewCount", "desc"), limit(limitCount));

    const querySnapshot = await getDocs(q);
    const popularPosts: { firebaseId: string; viewCount: number }[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      popularPosts.push({
        firebaseId: doc.id,
        viewCount: data.viewCount || 0,
      });
    });

    return popularPosts;
  } catch (error) {
    if (isDev) {
      console.warn("인기 포스트 가져오기 실패:", error);
    }
    return [];
  }
}

// 최근 댓글 가져오기
export async function getRecentComments(
  limitCount: number = 5
): Promise<Comment[]> {
  try {
    if (!db) {
      if (isDev) {
        console.warn("Firebase not initialized - 최근 댓글 가져오기 비활성화");
      }
      return [];
    }

    const commentsRef = collection(db, COMMENTS_COLLECTION);
    const q = query(
      commentsRef,
      where("isApproved", "==", true),
      orderBy("createdAt", "desc"),
      limit(limitCount)
    );

    const querySnapshot = await getDocs(q);
    const comments: Comment[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      comments.push({
        id: doc.id,
        author: data.author,
        content: data.content,
        createdAt: data.createdAt,
        isApproved: data.isApproved,
      });
    });

    return comments;
  } catch (error) {
    if (isDev) {
      console.warn("최근 댓글 가져오기 실패:", error);
    }
    return [];
  }
}

// 포스트 통계 초기화 (새 포스트 생성 시)
export async function initializePostStats(firebaseId: string): Promise<void> {
  try {
    if (!db) {
      if (isDev) {
        console.warn("Firebase not initialized - 포스트 통계 초기화 비활성화");
      }
      return;
    }

    const docRef = doc(db, POSTS_COLLECTION, firebaseId);
    await updateDoc(docRef, {
      viewCount: 0,
      likes: 0,
      commentCount: 0,
      likedBy: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (isDev) {
      console.warn("포스트 통계 초기화 실패:", error);
    }
  }
}

// Firebase 연결 상태 확인 함수
export function getFirebaseConnectionStatus(): boolean {
  return db !== null && isFirebaseConnected;
}
