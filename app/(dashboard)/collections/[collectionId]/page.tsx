"use client";

import React, { useState, useEffect } from "react";
import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";

type Params = Promise<{ collectionId: string }>;

const CollectionDetails = ({ params }: { params: Params }) => {
  const [loading, setLoading] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { collectionId } = await params;
        const res = await fetch(`/api/collections/${collectionId}`, {
          method: "GET",
        });
        const data = await res.json();
        setCollectionDetails(data);
      } catch (err) {
        console.error("[collectionId_GET]", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={collectionDetails} />
  );
};

export default CollectionDetails;
